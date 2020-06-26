from django.db import models

from datetime import datetime

from kocherga.dateutils import TZ
from .util import date_and_time_to_ts


class Order(models.Model):
    class Meta:
        db_table = 'cm_orders'
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    order_id = models.IntegerField(primary_key=True)
    card_id = models.BigIntegerField('Номер карты', db_index=True)
    start_ts = models.IntegerField(db_index=True)
    end_ts = models.IntegerField(db_index=True)
    imported_ts = models.IntegerField()
    log_imported_ts = models.IntegerField(null=True)
    people = models.IntegerField()
    visit_length = models.IntegerField()
    full_visit_length = models.IntegerField()
    order_value = models.IntegerField()
    time_value = models.IntegerField()
    stuff_value = models.IntegerField()
    payment_type = models.CharField(max_length=20)
    is_fixed = models.CharField(max_length=20)
    client_name = models.CharField(max_length=255)
    manager = models.CharField(max_length=255)
    tariff_time = models.CharField(max_length=20)
    tariff_plan = models.CharField(max_length=40)
    comment = models.CharField(max_length=1024)
    history = models.TextField()

    def __str__(self):
        return f'[{self.order_id}] {self.order_value} руб.'

    @classmethod
    def from_csv_row(cls, csv_row):
        params = {}

        field_map = {
            'order_id': 'Номер заказа',
            'card_id': 'Номер карты',
            'people': 'Кол-во человек',
            'visit_length': 'Продолжительность посещения, мин',
            'full_visit_length': 'Полная продолжительность посещения, мин',
            'order_value': 'Сумма заказа',
            'time_value': 'Стоимость времени',
            'stuff_value': 'Стоимость товаров',
            'payment_type': ' Тип оплаты',
            'is_fixed': 'Фикс',
            'client_name': 'Клиент',
            'manager': 'Менеджер',
            'tariff_time': 'Тарификация по времени',
            'tariff_plan': 'Тарифный план',
            'comment': 'Комментарии',
            'history': 'История',
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
                    value = int(float(value.replace(',', '.')))

            if field.name == 'card_id' and value > 2147483647:
                # this bad order fails to import to the db: https://kocherga.cafe-manager.ru/order/29541/
                value = 2147483647

            params[field.name] = value

        params["start_ts"] = date_and_time_to_ts(
            csv_row["Дата начала"], csv_row["Время начала"]
        )
        if csv_row["Дата конца"]:
            params["end_ts"] = date_and_time_to_ts(
                csv_row["Дата конца"], csv_row["Время конца"]
            )

        if not params["order_id"]:
            raise Exception(
                f"Can't accept an order without a primary key; row: {str(csv_row)}"
            )

        params["imported_ts"] = datetime.now(TZ).timestamp()

        (obj, created) = Order.objects.update_or_create(
            order_id=params['order_id'], defaults=params,
        )
        return obj

    @property
    def start_dt(self):
        return datetime.fromtimestamp(self.start_ts, TZ)

    @property
    def end_dt(self):
        if not self.end_ts:
            return None
        return datetime.fromtimestamp(self.end_ts, TZ)
