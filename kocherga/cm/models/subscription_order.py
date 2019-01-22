from django.db import models

from .util import date_and_time_to_ts

class SubscriptionOrder(models.Model):
    class Meta:
        unique_together = (
            ('card_id', 'ts'),
        )
        db_table = 'cm_subscription_orders'
        verbose_name = 'Абонемент'
        verbose_name_plural = 'Абонементы'

    id = models.AutoField(primary_key=True)
    card_id = models.BigIntegerField()
    ts = models.IntegerField() # TODO - migrate to DateTimeField
    order_value = models.IntegerField()
    payment_type = models.CharField(max_length=20)
    client_name = models.CharField(max_length=255)
    manager = models.CharField(max_length=255)

    @classmethod
    def from_csv_row(cls, csv_row):
        params = {}

        field_map = {
            'card_id': 'Номер карты',
            'order_value': 'Сумма заказа',
            'payment_type': ' Тип оплаты',
            'client_name': 'Клиент',
            'manager': 'Менеджер',
        }
        for field in cls._meta.get_fields():
            ru_title = field_map.get(field.name, None)
            if not ru_title:
                continue

            value = csv_row[ru_title]
            if isinstance(field, models.fields.IntegerField):
                if value == "":
                    value = None
                else:
                    value = int(float(value))

            params[field.name] = value

        params["ts"] = date_and_time_to_ts(
            csv_row["Дата начала"], csv_row["Время начала"]
        )

        (obj, created) = SubscriptionOrder.objects.update_or_create(
            card_id=params['card_id'], ts=params['ts'],
            defaults=params,
        )
        return obj
