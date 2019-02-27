from django.db import models

from datetime import datetime

import logging
logger = logging.getLogger(__name__)


class Auth(models.Model):
    class Meta:
        db_table = 'tochka_auth'

    id = models.IntegerField(primary_key=True, default=1)
    access_token = models.CharField(max_length=100)
    refresh_token = models.CharField(max_length=100)

    @classmethod
    def get(self):
        result = self.objects.first()
        if not result:
            raise Exception(
                "Tochka auth is not initialized, please call kocherga.money.tochka.auth.init_tokens() manually."
            )
        return result


class Record(models.Model):
    class Meta:
        db_table = 'tochka_records'

    id = models.CharField(max_length=100, primary_key=True)
    ts = models.IntegerField()
    purpose = models.TextField()
    document_type = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)

    @classmethod
    def from_element(cls, record):
        dt = datetime.strptime(record['payment_date'], '%d.%m.%Y')

        return cls(
            id=record.get("x_payment_id"),
            ts=dt.timestamp(),
            purpose=record.get("payment_purpose"),
            total=float(record.get("payment_amount")),
            document_type=int(record.get("operation_type")),
        )
