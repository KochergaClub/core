from __future__ import annotations

import enum
import logging
from datetime import date, datetime, timedelta
from decimal import Decimal
from typing import Any, Dict

from django.db import models
from kocherga.dateutils import TZ
from kocherga.django.managers import RelayQuerySetMixin

from . import ofd

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


class OfdFiscalDriveManager(models.Manager):
    def import_all(self):
        result = ofd.api_call("v2/KKT")
        kkt_dict = result.get('KKT', [])
        for (fn, kkt_info) in kkt_dict.items():
            OfdFiscalDrive.objects.get_or_create(fiscal_drive_number=fn)


class OfdFiscalDrive(models.Model):
    fiscal_drive_number = models.CharField(max_length=20, unique=True, db_index=True)

    objects: OfdFiscalDriveManager = OfdFiscalDriveManager()

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
        return datetime.strptime(items[0]["dateTime"], "%Y-%m-%d %H:%M:%S")


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
            id=data["fiscalDocumentNumber"],
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
                fiscal_drive=fiscal_drive,
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
    # not autoincremented, id is imported from OFD
    id = models.IntegerField(primary_key=True)

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

    fiscal_drive = models.ForeignKey(
        OfdFiscalDrive,
        on_delete=models.PROTECT,
        related_name='documents',
    )

    imported_json = models.JSONField(blank=True, null=True)

    objects = OfdDocumentManager()

    class Meta:
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
