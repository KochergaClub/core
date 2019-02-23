import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta, date
import requests
from collections import defaultdict
import decimal

import enum

from django.conf import settings
from django.db import models

from typing import Any, Dict, List

from kocherga.datetime import TZ
import kocherga.importer.base

API_URL = "https://api.ofd-ya.ru/ofdapi/v1"
FISCAL_DRIVE_NUMBER = settings.KOCHERGA_MONEY_OFD_FISCAL_DRIVE_NUMBER
TOKEN = settings.KOCHERGA_MONEY_OFD_YA_TOKEN
DT_FORMAT = "%Y-%m-%d %H:%M:%S"


class CheckType(enum.Enum):
    income = 1
    refund_income = 2
    expense = 3
    refund_expense = 4


class OfdDocument(models.Model):
    class Meta:
        db_table = "ofd_documents"
#        managed = False

    id = models.IntegerField(primary_key=True)
    timestamp = models.IntegerField()
    cash = models.DecimalField(max_digits=10, decimal_places=2)
    electronic = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    check_type = models.CharField(
        max_length=40,
        choices=[
            (t.name, t.name) for t in CheckType
        ],
    )
    shift_id = models.IntegerField()   # TODO - foreign key
    request_id = models.IntegerField() # cheque number in current shift
    operator = models.CharField(max_length=255)
    operator_inn = models.BigIntegerField(null=True)
    fiscal_sign = models.BigIntegerField()
    midday_ts = models.IntegerField()  # used for analytics only

    @classmethod
    def from_json(cls, item: Dict[str, Any]) -> "OfdDocument":
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
            check_type=CheckType(item["operationType"]),
            shift_id=int(item["shiftNumber"]),
            request_id=int(item["requestNumber"]),
            operator=item["operator"],
            operator_inn=item.get("operator_inn", None),
            fiscal_sign=item["fiscalSign"],
            midday_ts=midday_ts,
        )


class OfdYaKkt:

    def __init__(self, fiscal_drive_number: int) -> None:
        self.fdnum = fiscal_drive_number

    def request(self, method: str, params: Dict[str, Any]):
        r = requests.post(
            f"{API_URL}/{method}",
            headers={"Ofdapitoken": TOKEN, "Content-Type": "application/json"},
            json=params,
        )
        r.raise_for_status()
        return r.json()

    def documents(self, d: date) -> List[OfdDocument]:
        items = self.request(
            "documents",
            {"fiscalDriveNumber": self.fdnum, "date": d.strftime("%Y-%m-%d")},
        ).get("items", [])

        return [OfdDocument.from_json(item) for item in items]

    def shift_opened(self, shift_id: int) -> datetime:
        items = self.request(
            "documentsShift",
            {
                "fiscalDriveNumber": self.fdnum,
                "shiftNumber": str(shift_id),
                "docType": ["open_shift"],
            },
        ).get("items", [])

        assert len(items) == 1
        return datetime.strptime(items[0]["dateTime"], DT_FORMAT)


ofd = OfdYaKkt(FISCAL_DRIVE_NUMBER)


def cash_income_by_date(start_d, end_d):
    docs = OfdDocument.objects.filter(
        midday_ts__gte = datetime.combine(start_d, datetime.min.time()).timestamp()
    ).filter(
        midday_ts__lte = datetime.combine(end_d, datetime.max.time()).timestamp()
    ).all()

    date2income = defaultdict(decimal.Decimal)
    for doc in docs:
        d = datetime.fromtimestamp(doc.midday_ts).date()
        if doc.check_type == 'income':
            date2income[d] += doc.cash
        elif doc.check_type == 'refund_income':
            date2income[d] -= doc.cash

    return [
        {'date': d, 'income': date2income[d]}
        for d in sorted(date2income.keys())
    ]


def import_date(d: date) -> None:
    documents = ofd.documents(d)

    for document in documents:
        document.save()

    # TODO - import shifts


class Importer(kocherga.importer.base.IncrementalImporter):

    def get_initial_dt(self):
        # take the first shift's date
        d = ofd.shift_opened(1).date()

        # scroll back a few more days just in case
        d -= timedelta(days=2)

        return datetime.combine(d, datetime.min.time(), tzinfo=TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime) -> datetime:
        from_d = from_dt.date()
        to_d = to_dt.date()

        d = from_d

        while d <= to_d:
            logger.info("importing " + d.strftime("%Y-%m-%d"))
            import_date(d)
            d += timedelta(days=1)

        return datetime.combine(to_d, datetime.min.time(), tzinfo=TZ)

    def interval(self):
        return {"minutes": 5}
