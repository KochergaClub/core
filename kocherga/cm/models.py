from django.db import models

from datetime import datetime, date
import enum
from collections import namedtuple

from kocherga.datetime import TZ


def _date_and_time_to_ts(d, t):
    return datetime.strptime("{} {}".format(d, t), "%d.%m.%Y %H:%M").replace(tzinfo=TZ).timestamp()


class SubscriptionOrder(models.Model):
    class Meta:
        unique_together = (
            ('card_id', 'ts'),
        )
        db_table = 'cm_subscription_orders'

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
            'payment_type': 'Тип оплаты',
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

        params["ts"] = _date_and_time_to_ts(
            csv_row["Дата начала"], csv_row["Время начала"]
        )

        return cls(**params)


class Order(models.Model):
    class Meta:
        db_table = 'cm_orders'

    order_id = models.IntegerField(primary_key=True)
    card_id = models.BigIntegerField(db_index=True)
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
            'payment_type': 'Тип оплаты',
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
                    value = int(float(value))

            if field.name == 'card_id' and value > 2147483647:
                value = 2147483647 # this bad order fails to import to the db: https://kocherga.cafe-manager.ru/order/29541/

            params[field.name] = value

        params["start_ts"] = _date_and_time_to_ts(
            csv_row["Дата начала"], csv_row["Время начала"]
        )
        if csv_row["Дата конца"]:
            params["end_ts"] = _date_and_time_to_ts(
                csv_row["Дата конца"], csv_row["Время конца"]
            )

        if not params["order_id"]:
            raise Exception(
                f"Can't accept an order without a primary key; row: {str(csv_row)}"
            )

        params["imported_ts"] = datetime.now(TZ).timestamp()

        return cls(**params)

    @property
    def start_dt(self):
        return datetime.fromtimestamp(self.start_ts, TZ)

    @property
    def end_dt(self):
        if not self.end_ts:
            return None
        return datetime.fromtimestamp(self.end_ts, TZ)


class OrderLogEntry(models.Model):
    class Meta:
        unique_together = (
            ('order', 'operation_id'),
        )
        db_table = 'cm_order_log'

    operation_id = models.IntegerField()
    operation = models.CharField(max_length=1024)
    ts = models.IntegerField(db_index=True)
    login = models.CharField(max_length=80)

    order = models.ForeignKey(Order, on_delete=models.CASCADE)


class Gender(enum.Enum):
    unknown = 0
    male = 1
    female = 2


class Customer(models.Model):
    class Meta:
        db_table = 'cm_customers'

    # important
    customer_id = models.IntegerField(primary_key=True)
    card_id = models.BigIntegerField(db_index=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(
        max_length=20,
        choices=[
            (t.name, t.name) for t in Gender
        ],
        blank=True,
    )
    email = models.CharField(max_length=255, db_index=True)
    time_discount = models.IntegerField()
    is_active = models.BooleanField()  # "Активный" / "В архиве"

    # can be restored from subscriptions table (when we import it)
    subscription_until = models.DateField(null=True)

    # maybe important
    comment = models.TextField()

    # mostly unused
    phone_number = models.CharField(max_length=40)
    phone_number2 = models.CharField(max_length=40)
    vk_link = models.CharField(max_length=1024)
    fb_link = models.CharField(max_length=1024)
    twitter_link = models.CharField(max_length=1024)
    instagram_link = models.CharField(max_length=1024)
    skype_link = models.CharField(max_length=1024)
    website_link = models.CharField(max_length=1024)
    birthday = models.DateField(null=True)
    address = models.CharField(max_length=1024)

    ref = models.CharField(max_length=1024)
    ref2 = models.CharField(max_length=1024)
    mailing_list = models.BooleanField()  # useless - filled randomly

    goods_discount = models.IntegerField()

    # can probably be restored from other data
    activity_started = models.DateTimeField(null=True)
    activity_ended = models.DateTimeField(null=True)
    last_visit = models.DateField(null=True)
    total_spent = models.IntegerField()

    def __str__(self):
        return f'{self.card_id} {self.first_name or ""} {self.last_name or ""}'

    @classmethod
    def from_csv_row(cls, csv_row):
        params = {}

        field_map = {
            'customer_id': 'id',
            'card_id': 'Номер Карты',
            'first_name': 'Имя',
            'last_name': 'Фамилия',
            'gender': 'Пол',
            'email': 'E-mail',
            'time_discount': 'Скидка на время',
            'is_active': 'Статус',
            'subscription_until': 'Абонемент',
            'comment': 'Комментарий',
            'phone_number': 'Телефон',
            'phone_number2': 'Телефон 2',
            'vk_link': 'Вконтакте',
            'fb_link': 'FaceBook',
            'twitter_link': 'Twitter',
            'instagram_link': 'Instagram',
            'skype_link': 'Skype',
            'website_link': 'Сайт',
            'birthday': 'Дата рождения',
            'address': 'Адрес',
            'ref': 'Ref',
            'ref2': 'Ref 2',
            'mailing_list': 'Рассылка',
            'goods_discount': 'Скидка на товары',
            'activity_started': 'Начало активности',
            'activity_ended': 'Конец активности',
            'last_visit': 'Последний визит',
            'total_spent': 'Всего денег',
        }
        for field in cls._meta.get_fields():
            ru_title = field_map.get(field.name, None)
            if not ru_title:
                continue

            value = csv_row[ru_title]

            if field.name == 'gender':
                if value == "жен.":
                    value = Gender.female.name
                elif value == "муж.":
                    value = Gender.male.name
                elif value == '':
                    pass
                else:
                    raise Exception(f"Unparsable gender value {value}")
            elif isinstance(field, models.fields.CharField):
                pass
            elif isinstance(field, models.fields.TextField):
                pass
            elif isinstance(field, models.fields.IntegerField):
                if value.endswith("%"):
                    value = value[:-1]
                if value == '':
                    value = 0
                value = int(float(value))
            # Order for this and the following case is important - seems like DateTimeField subclasses DateField.
            elif isinstance(field, models.fields.DateTimeField):
                if value == '':
                    value = None
                else:
                    value = datetime.strptime(value, "%d.%m.%Y %H:%M").replace(tzinfo=TZ)
            elif isinstance(field, models.fields.DateField):
                if value == '':
                    value = None
                else:
                    value = datetime.strptime(value, "%d.%m.%Y").replace(tzinfo=TZ).date()
            elif isinstance(field, models.fields.BooleanField):
                if value in ("Да", "true", "Активный"):
                    value = True
                elif value in ("Нет", "false", "В Архиве"):
                    value = False
                else:
                    raise Exception(f"Unparsable boolean value {value}")
            else:
                raise Exception(
                    f"Don't know how to to parse value to {field}"
                )

            params[field.name] = value

        return Customer(**params)

    @property
    def privacy_mode(self):
        if self.comment and 'PRIVACY:PUBLIC' in self.comment:
            return 'public'
        return 'private'


User = namedtuple("User", "id login name level")
