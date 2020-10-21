import logging

logger = logging.getLogger(__name__)

from typing import Dict, Optional, Any
import json
import requests
from django.db import models
from django.conf import settings


def api_call(
    method: str,
    url: str,
    params: Optional[Dict[str, Any]] = None,
    idempotence_key: Optional[str] = None,
):
    SHOP_ID = settings.YANDEX_KASSA['shopId']
    SECRET = settings.YANDEX_KASSA['secret']

    if method == 'GET':
        req = requests.get
    elif method == 'POST':
        req = requests.post
    else:
        raise NotImplementedError()

    r = req(
        f'https://payment.yandex.net/api/v3/{url}',
        auth=(SHOP_ID, SECRET),
        headers={
            'Idempotence-Key': idempotence_key,
        },
        json=params,
    )
    if r.status_code >= 400:
        logger.error(f"ERROR: {r.content}")
    r.raise_for_status()
    return r.json()


class Manager(models.Manager):
    def create(self, amount: int, description: str):

        payment = Payment(
            amount=amount,
            description=description,
        )
        payment.save()  # allocate primary key

        result = api_call(
            'POST',
            'payments',
            {
                'capture': False,
                'description': description,
                'confirmation': {
                    'type': 'embedded',
                },
                'amount': {
                    'value': amount,
                    'currency': 'RUB',
                },
            },
            idempotence_key=f'payment-{payment.pk}',
        )
        payment.payment_data = json.dumps(result)
        payment.save()
        payment.full_clean()
        return payment


class Payment(models.Model):
    amount = models.IntegerField()
    description = models.CharField(max_length=1024)

    # TODO - migrate to JSONField when we update to django 3.1
    payment_data = models.TextField(
        blank=True,  # should be blank initially because we want to use primary key as idempotence key
        editable=False,
    )

    objects = Manager()

    @property
    def payment_object(self):
        if not self.payment_data:
            raise Exception(
                "Payment data is empty, payment wasn't created via Yandex.Kassa API or saved in DB for some reason"
            )
        return json.loads(self.payment_data)

    def get_kassa_id(self):
        return self.payment_object['id']

    def get_confirmation_token(self):
        return self.payment_object['confirmation']['confirmation_token']

    def is_paid(self):
        return self.payment_object['paid']

    def is_waiting_for_capture(self):
        return self.payment_object['status'] == 'waiting_for_capture'

    def update(self):
        kassa_id = self.get_kassa_id()

        result = api_call(
            'GET',
            f'payments/{kassa_id}',
        )
        self.payment_data = json.dumps(result)
        self.save()

    def capture(self):
        kassa_id = self.get_kassa_id()

        result = api_call(
            'POST',
            f'payments/{kassa_id}/capture',
            {},
            idempotence_key=f'payment-capture-{self.pk}',
        )
        self.payment_data = json.dumps(result)
        self.save()
