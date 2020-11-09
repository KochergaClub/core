from __future__ import annotations
from datetime import datetime, date, timedelta
from typing import Any, Dict, List

import enum

from django.db import models

from kocherga.dateutils import TZ
from kocherga.django.managers import RelayQuerySetMixin

from . import ofd


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

    objects = OfdFiscalDriveManager()

    def __str__(self):
        return self.fiscal_drive_number

    def import_documents(self, d: date) -> List[OfdDocument]:
        items = ofd.api_call(
            "v1/documents",
            {
                "fiscalDriveNumber": self.fiscal_drive_number,
                "date": d.strftime("%Y-%m-%d"),
            },
        ).get("items", [])

        return [OfdDocument.from_json(item, fiscal_drive=self) for item in items]

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
        null=True,  # TODO - make non-null after first deployment
        related_name='documents',
    )

    objects = OfdDocumentManager()

    class Meta:
        ordering = ['-timestamp']

    @classmethod
    def from_json(
        cls, item: Dict[str, Any], fiscal_drive: OfdFiscalDrive
    ) -> OfdDocument:
        ts = int(item["dateTime"])

        dt = datetime.fromtimestamp(ts, tz=TZ)
        if dt.hour < 4:
            dt -= timedelta(days=1)
        midday_ts = int(dt.replace(hour=12, minute=0, second=0).timestamp())

        cash = item["cashTotalSum"] / 100
        electronic = item["ecashTotalSum"] / 100
        assert (
            item["cashTotalSum"] + item["ecashTotalSum"] == item["totalSum"]
        )  # if this check doesn't pass, something is seriously wrong

        return OfdDocument(
            id=item["fiscalDocumentNumber"],
            timestamp=ts,
            cash=cash,
            electronic=electronic,
            total=cash + electronic,
            check_type=CheckType(item["operationType"]).name,
            shift_id=int(item["shiftNumber"]),
            request_id=int(item["requestNumber"]),
            operator=item["operator"],
            operator_inn=item.get("operator_inn", None),
            fiscal_sign=item["fiscalSign"],
            midday_ts=midday_ts,
            fiscal_drive=fiscal_drive,
        )
