import logging
from datetime import datetime, timedelta, date
import requests

import enum

from sqlalchemy import Column, Integer, BigInteger, String, Text, Numeric, Enum

from typing import Any, Dict, List

import kocherga.secrets
import kocherga.db
import kocherga.config
import kocherga.importer.base

API_URL = "https://api.ofd-ya.ru/ofdapi/v1"
FISCAL_DRIVE_NUMBER = kocherga.config.config()["money"]["fiscal_drive_number"]
TOKEN = kocherga.secrets.plain_secret("ofd_ya_token")
DT_FORMAT = "%Y-%m-%d %H:%M:%S"


class CheckType(enum.Enum):
    income = 1
    refund_income = 2
    expense = 3
    refund_expense = 4


class OfdDocument(kocherga.db.Base):
    __tablename__ = "ofd_documents"
    id = Column(Integer, primary_key=True)
    timestamp = Column(Integer)
    cash = Column(Numeric(10, 2))
    electronic = Column(Numeric(10, 2))
    total = Column(Numeric(10, 2))
    check_type = Column(Enum(CheckType))
    shift_id = Column(Integer)  # TODO - foreign key
    request_id = Column(Integer)  # cheque number in current shift
    operator = Column(String(255))
    operator_inn = Column(BigInteger)
    fiscal_sign = Column(BigInteger)
    midday_ts = Column(Integer)  # used for analytics only

    @classmethod
    def from_json(cls, item: Dict[str, Any]) -> "OfdDocument":
        ts = int(item["dateTime"])

        dt = datetime.fromtimestamp(ts, tz=kocherga.config.TZ)
        if dt.hour < 4:
            dt -= timedelta(days=1)
        midday_ts = int(dt.replace(hour=12).timestamp())

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


def import_date(d: date, session) -> None:
    documents = ofd.documents(d)

    for document in documents:
        document = session.merge(document)

    # Necessary because session.merge can't resolve duplicate objects.
    # We get some duplicates on consecutive dates because of a stupid collision on 00:00.
    session.flush()

    # TODO - import shifts


class Importer(kocherga.importer.base.IncrementalImporter):

    def init_db(self):
        OfdDocument.__table__.create(bind=kocherga.db.engine())

    def get_initial_dt(self):
        # take the first shift's date
        d = ofd.shift_opened(1).date()

        # scroll back a few more days just in case
        d -= timedelta(days=2)

        return datetime.combine(d, datetime.min.time(), tzinfo=kocherga.config.TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime, session) -> datetime:
        from_d = from_dt.date()
        to_d = to_dt.date()

        d = from_d

        while d <= to_d:
            logging.info("importing " + d.strftime("%Y-%m-%d"))
            import_date(d, session)
            d += timedelta(days=1)

        return datetime.combine(to_d, datetime.min.time(), tzinfo=kocherga.config.TZ)

    def interval(self):
        return {"minutes": 5}
