from __future__ import annotations

import enum
import logging
from datetime import date, datetime, timedelta
from decimal import Decimal
from typing import Any, Dict

from django.db import models
from django.utils import timezone
from kocherga.dateutils import TZ
from kocherga.django.managers import RelayQuerySetMixin
from kocherga.django.models import SingletonModel

from . import kkmserver, ofd

logger = logging.getLogger(__name__)


class CheckType(enum.Enum):
    income = 1
    refund_income = 2
    expense = 3
    refund_expense = 4


# via: https://stackoverflow.com/a/37988537
class Permissions(models.Model):
    class Meta:
        managed = False
        default_permissions = ()

        permissions = [
            ('kkmserver', 'Can access kkmserver'),
            ('ofd', 'Can access imported OFD data'),
        ]


class Controller(SingletonModel):
    """This model stores KKM state and implements shift-closing business logic."""

    last_shift_closed = models.DateTimeField(
        'Время последнего закрытия смены', null=True, blank=True
    )

    def close_shift(self):
        result = kkmserver.execute(kkmserver.getCloseShiftRequest())
        if result['Status'] != 0:
            raise Exception(
                f"Expected status 0, got: {result['Status']}. Error: {result.get('Error')}"
            )
        self.last_shift_closed = timezone.now()
        self.full_clean()
        self.save()

    def register_check(
        self,
        email: str,
        title: str,
        sum: int,
        sign_method_calculation: kkmserver.SignMethodCalculation,
    ):
        return kkmserver.execute(
            kkmserver.getCheckRequest(
                kkmserver.OnlineCheck(
                    email=email,
                    title=title,
                    sum=sum,
                    signMethodCalculation=sign_method_calculation,
                )
            )
        )


def parse_ofd_datetime(date_string: str):
    return datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S").replace(tzinfo=TZ)


class OfdFiscalDriveManager(models.Manager):
    def import_all(self):
        result = ofd.api_call("v2/KKT")
        kkt_dict = result.get('KKT', [])
        for (fn, kkt_info) in kkt_dict.items():
            OfdFiscalDrive.objects.get_or_create(fiscal_drive_number=fn)


class OfdFiscalDrive(models.Model):
    fiscal_drive_number = models.CharField(max_length=20, unique=True, db_index=True)

    objects = OfdFiscalDriveManager()

    def __str__(self):
        return self.fiscal_drive_number

    def import_documents(self, d: date, force_update: bool = False):
        items = ofd.api_call(
            "v1/documents",
            {
                "fiscalDriveNumber": self.fiscal_drive_number,
                "date": d.strftime("%Y-%m-%d"),
            },
        ).get("items", [])

        for data in items:
            OfdDocument.objects.create_from_json(
                data, fiscal_drive=self, force_update=force_update
            )

    def import_shifts(self, from_date: date, to_date: date):
        logger.info(f"Importing shifts from {from_date} to {to_date}")
        shifts_dict = ofd.api_call(
            "v2/KKTShift",
            {
                "fiscalDriveNumber": self.fiscal_drive_number,
                "startDate": from_date.strftime("%Y-%m-%d"),
                "endDate": to_date.strftime("%Y-%m-%d"),
            },
        ).get("shifts", {})

        for (shift_id, data) in shifts_dict.items():
            OfdShift.objects.create_from_json(int(shift_id), data, fiscal_drive=self)
        logger.info(f"Updated {len(shifts_dict)} shifts")

    def load_first_shift_opened(self) -> datetime:
        items = ofd.api_call(
            "v1/documentsShift",
            {
                "fiscalDriveNumber": self.fiscal_drive_number,
                "shiftNumber": "1",
                "docType": ["open_shift"],
            },
        ).get("items", [])

        assert len(items) == 1
        return parse_ofd_datetime(items[0]["dateTime"])


class OfdDocumentQuerySet(models.QuerySet, RelayQuerySetMixin):
    pass


class OfdDocumentManager(models.Manager):
    def get_queryset(self):
        return OfdDocumentQuerySet(self.model, using=self._db)

    def relay_page(self, *args, **kwargs):
        return self.get_queryset().relay_page(*args, **kwargs)

    def create_from_json(
        self,
        data: Dict[str, Any],
        fiscal_drive: OfdFiscalDrive,
        force_update: bool = False,
    ):
        ts = int(data["dateTime"])

        dt = datetime.fromtimestamp(ts, tz=TZ)
        if dt.hour < 4:
            dt -= timedelta(days=1)
        midday_ts = int(dt.replace(hour=12, minute=0, second=0).timestamp())

        cash = Decimal(data["cashTotalSum"]) / 100
        electronic = Decimal(data["ecashTotalSum"]) / 100
        assert (
            cash + electronic == Decimal(data["totalSum"]) / 100
        )  # if this check doesn't pass, something is seriously wrong

        (document, created) = self.update_or_create(
            document_id=data["fiscalDocumentNumber"],
            fiscal_drive=fiscal_drive,
            defaults=dict(
                timestamp=ts,
                cash=cash,
                electronic=electronic,
                total=cash + electronic,
                check_type=CheckType(data["operationType"]).name,
                shift_id=int(data["shiftNumber"]),
                request_id=int(data["requestNumber"]),
                operator=data["operator"],
                operator_inn=data.get("operator_inn", None),
                fiscal_sign=data["fiscalSign"],
                midday_ts=midday_ts,
                imported_json=data,
            ),
        )
        logger.info(f"{'Created' if created else 'Updated'} document {document.id}")
        if created or force_update:
            new_item_ids = []
            for item_data in data["items"]:
                (item, _) = OfdDocumentItem.objects.update_or_create(
                    document=document,
                    name=item_data["name"],
                    quantity=item_data["quantity"],
                    price=Decimal(item_data["price"]) / 100,
                    defaults=dict(
                        sum=Decimal(item_data["sum"]) / 100,
                        product_type=item_data["productType"],
                        payment_type=item_data["paymentType"],
                    ),
                )
                logger.info(
                    f"{'Created' if created else 'Updated'} item {item.id} for document {document.id}"
                )
                new_item_ids.append(item.pk)

            # this should never happen since documents are immutable, but items don't have IDs, so it's possible that
            # this code will be helpful somehow.
            # Hopefully it doesn't have bugs which would break DB even more...
            for old_item in document.items.all():
                if old_item.pk not in new_item_ids:
                    logger.info(
                        f"Deleted item {old_item.id} for document {document.id} because it wasn't found in the latest data"
                    )
                    old_item.delete()


class OfdDocument(models.Model):
    id = models.AutoField(primary_key=True)

    timestamp = models.IntegerField()
    cash = models.DecimalField(max_digits=10, decimal_places=2)
    electronic = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    check_type = models.CharField(
        max_length=40,
        choices=[(t.name, t.name) for t in CheckType],
    )
    shift_id = models.IntegerField()  # TODO - foreign key
    request_id = models.IntegerField()  # cheque number in current shift
    operator = models.CharField(max_length=255)
    operator_inn = models.BigIntegerField(null=True)
    fiscal_sign = models.BigIntegerField()
    midday_ts = models.IntegerField()  # used for analytics only

    document_id = models.IntegerField()
    fiscal_drive = models.ForeignKey(
        OfdFiscalDrive,
        on_delete=models.PROTECT,
        related_name='documents',
    )

    imported_json = models.JSONField(blank=True, null=True)

    objects = OfdDocumentManager()

    class Meta:
        unique_together = [('document_id', 'fiscal_drive')]
        ordering = ['-timestamp']


class OfdDocumentItem(models.Model):
    document = models.ForeignKey(
        OfdDocument, on_delete=models.CASCADE, related_name="items"
    )
    name = models.CharField(max_length=255)
    quantity = models.FloatField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sum = models.DecimalField(max_digits=10, decimal_places=2)

    # TODO - choices
    product_type = models.IntegerField()
    payment_type = models.IntegerField()


class OfdShiftQuerySet(models.QuerySet, RelayQuerySetMixin):
    pass


class OfdShiftManager(models.Manager):
    def get_queryset(self):
        return OfdShiftQuerySet(self.model, using=self._db)

    def relay_page(self, *args, **kwargs):
        return self.get_queryset().relay_page(*args, **kwargs)

    def create_from_json(
        self,
        shift_id: int,
        data: Dict[str, Any],
        fiscal_drive: OfdFiscalDrive,
    ):
        cash = Decimal(data["cashTotalSum"]) / 100
        electronic = Decimal(data["ecashTotalSum"]) / 100
        assert (
            cash + electronic == Decimal(data["totalSum"]) / 100
        )  # if this check doesn't pass, something is seriously wrong

        open_dt = parse_ofd_datetime(data["openDateTime"])
        close_dt = None
        if data.get("closeDateTime"):
            close_dt = parse_ofd_datetime(data["closeDateTime"])

        logger.info(f"Updating shift {shift_id}")
        (shift, created) = self.update_or_create(
            fiscal_drive=fiscal_drive,
            shift_id=shift_id,
            defaults=dict(
                cash=cash,
                electronic=electronic,
                open_dt=open_dt,
                close_dt=close_dt,
                imported_json=data,
            ),
        )


class OfdShift(models.Model):
    fiscal_drive = models.ForeignKey(
        OfdFiscalDrive,
        on_delete=models.PROTECT,
        related_name='shifts',
    )
    shift_id = models.IntegerField()

    electronic = models.DecimalField(max_digits=10, decimal_places=2)
    cash = models.DecimalField(max_digits=10, decimal_places=2)
    close_dt = models.DateTimeField(blank=True, null=True)
    open_dt = models.DateTimeField()

    imported_json = models.JSONField()

    objects = OfdShiftManager()

    class Meta:
        unique_together = [('fiscal_drive', 'shift_id')]
        ordering = ['-open_dt']
