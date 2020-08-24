from datetime import datetime, date
from typing import Any, Dict, List

import requests

from django.conf import settings

from .models import OfdDocument

API_URL = "https://api.ofd-ya.ru/ofdapi/v1"
FISCAL_DRIVE_NUMBER = settings.KOCHERGA_MONEY_OFD_FISCAL_DRIVE_NUMBER
TOKEN = settings.KOCHERGA_MONEY_OFD_YA_TOKEN
DT_FORMAT = "%Y-%m-%d %H:%M:%S"


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
