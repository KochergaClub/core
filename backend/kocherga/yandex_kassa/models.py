from typing import Dict, Optional, Any
import json
import requests
from django.db import models


def api_call(
    method: str,
    url: str,
    params: Optional[Dict[str, Any]] = None,
    idempotence_key: Optional[str] = None,
):
    SHOP_ID = ...
    SECRET = ...

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
    r.raise_for_status()
    return r.json()


class Manager(models.Manager):
    def create(self, amount: int, description: str):
        result = api_call(
            'POST',
            'payments',
            {
                'capture': True,
                'description': description,
                'confirmation': {
                    'type': 'embedded',
                },
                'amount': {
                    'value': amount,
                    'currency': 'RUB',
                },
            },
            # TODO:
            # idempotence_key=idempotence_key,
        )

        payment = Payment(
            amount=amount,
            description=description,
            payment_data=json.dumps(result),
        )
        payment.save()
        payment.full_clean()
        return payment


class Payment(models.Model):
    amount = models.IntegerField()
    description = models.CharField(max_length=1024)
    # idempotence_key = models.CharField(editable=False)

    # TODO - migrate to JSONField when we update to django 3.1
    payment_data = models.TextField()

    objects = Manager()

    @property
    def payment_object(self):
        return json.loads(self.payment_data)

    def get_kassa_id(self):
        return self.payment_object['id']

    def get_confirmation_token(self):
        return self.payment_object['confirmation']['confirmation_token']

    def is_paid(self):
        return self.payment_object['paid']

    def update(self):
        kassa_id = self.get_kassa_id()

        result = api_call(
            'GET',
            f'payments/{kassa_id}',
        )
        self.payment_data = json.dumps(result)
        self.save()
