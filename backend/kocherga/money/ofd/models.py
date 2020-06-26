from datetime import datetime, timedelta
from collections import defaultdict
import decimal

import enum

from django.db import models

from typing import Any, Dict

from kocherga.dateutils import TZ


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
        max_length=40, choices=[(t.name, t.name) for t in CheckType],
    )
    shift_id = models.IntegerField()  # TODO - foreign key
    request_id = models.IntegerField()  # cheque number in current shift
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
            check_type=CheckType(item["operationType"]).name,
            shift_id=int(item["shiftNumber"]),
            request_id=int(item["requestNumber"]),
            operator=item["operator"],
            operator_inn=item.get("operator_inn", None),
            fiscal_sign=item["fiscalSign"],
            midday_ts=midday_ts,
        )


def cash_income_by_date(start_d, end_d):
    docs = (
        OfdDocument.objects.filter(
            midday_ts__gte=datetime.combine(start_d, datetime.min.time()).timestamp()
        )
        .filter(midday_ts__lte=datetime.combine(end_d, datetime.max.time()).timestamp())
        .all()
    )

    date2income = defaultdict(decimal.Decimal)
    for doc in docs:
        d = datetime.fromtimestamp(doc.midday_ts).date()
        if doc.check_type == 'income':
            date2income[d] += doc.cash
        elif doc.check_type == 'refund_income':
            date2income[d] -= doc.cash

    return [{'date': d, 'income': date2income[d]} for d in sorted(date2income.keys())]
