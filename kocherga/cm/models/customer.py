import logging
logger = logging.getLogger(__name__)

import enum
from datetime import datetime, time

from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.timezone import make_aware

from requests_toolbelt.multipart.encoder import MultipartEncoder
import requests

from kocherga.dateutils import TZ

from ..scraper import DOMAIN, load_customer_from_html
from .. import auth
from .order import Order

KchUser = get_user_model()


class Gender(enum.Enum):
    unknown = 0
    male = 1
    female = 2


class CustomerQuerySet(models.QuerySet):
    def active(self):
        return self.filter(is_active=True)

    def from_date(self, d):
        return self.filter(
            activity_started__gt=make_aware(datetime.combine(d, time.min)),
            activity_started__lt=make_aware(datetime.combine(d, time.max)),
        )


class Customer(models.Model):
    class Meta:
        db_table = 'cm_customers'
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'

    objects = CustomerQuerySet.as_manager()

    # important
    customer_id = models.IntegerField(primary_key=True)
    card_id = models.BigIntegerField('Номер карты', db_index=True)
    first_name = models.CharField('Имя', max_length=100)
    last_name = models.CharField('Фамилия', max_length=100)
    gender = models.CharField(
        'Пол',
        max_length=20,
        choices=[
            (t.name, t.name) for t in Gender
        ],
        blank=True,
    )
    email = models.CharField(max_length=255, db_index=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    time_discount = models.IntegerField()
    is_active = models.BooleanField()  # "Активный" / "В архиве"

    # can be restored from subscriptions table.
    subscription_until = models.DateField(null=True, blank=True)

    # maybe important
    comment = models.TextField(blank=True)

    # mostly unused
    phone_number = models.CharField(max_length=40, blank=True)
    phone_number2 = models.CharField(max_length=40, blank=True)
    vk_link = models.CharField(max_length=1024, blank=True)
    fb_link = models.CharField(max_length=1024, blank=True)
    twitter_link = models.CharField(max_length=1024, blank=True)
    instagram_link = models.CharField(max_length=1024, blank=True)
    skype_link = models.CharField(max_length=1024, blank=True)
    website_link = models.CharField(max_length=1024, blank=True)
    birthday = models.DateField(blank=True, null=True)
    address = models.CharField(max_length=1024, blank=True)

    ref = models.CharField(max_length=1024, blank=True)
    ref2 = models.CharField(max_length=1024, blank=True)
    mailing_list = models.BooleanField()  # useless - filled randomly

    goods_discount = models.IntegerField()

    # can probably be restored from other data
    activity_started = models.DateTimeField(null=True, blank=True)
    activity_ended = models.DateTimeField(null=True, blank=True)
    last_visit = models.DateField(null=True, blank=True)
    total_spent = models.IntegerField()

    # local fields - not from CM
    privacy_mode = models.CharField('Приватность', max_length=40, default='private', choices=(
        ('private', 'private'),
        ('public', 'public'),
    ))

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
                    raise Exception(f"Unparsable gender value {value} (name: {csv_row['Имя']})")
            elif isinstance(field, models.fields.CharField):
                pass
            elif isinstance(field, models.fields.TextField):
                pass
            elif isinstance(field, models.fields.IntegerField):
                if value.endswith("%"):
                    value = value[:-1]
                if value == '':
                    value = 0
                else:
                    value = int(float(value.replace(',', '.')))
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
                    if csv_row['Имя'] == r'апр':
                        continue  # invalid customer from demo.cafe-manager.ru which has invalid gender
                    raise Exception(f"Unparsable boolean value {value} (name: {csv_row['Имя']})")
            else:
                raise Exception(
                    f"Don't know how to to parse value to {field}"
                )

            params[field.name] = value

        email = params['email']
        if email and params['is_active']:
            try:
                user = KchUser.objects.get(email=email)
            except KchUser.DoesNotExist:
                user = KchUser.objects.create_user(email)
            params['user'] = user

        try:
            (obj, created) = Customer.objects.update_or_create(
                customer_id=params['customer_id'],
                defaults=params,
            )
        except Exception as e:
            logger.error(f"Failed to create or update customer {params['customer_id']}, probably an email collision")
            raise e

        return obj

    def _http_update_customer(self, data):
        """
        Update customer data in Cafe Manager.

        Doesn't update the local database. Returns the new customer data scraped from HTML.
        """

        multipart_data = MultipartEncoder(fields=data)

        url = f"{DOMAIN}/customer/{self.customer_id}/edit/"
        r = requests.post(
            url,
            cookies=auth.get_cookies(),
            data=multipart_data,
            headers={"Content-Type": multipart_data.content_type},
        )
        r.raise_for_status()

        return load_customer_from_html(self.customer_id)

    def extend_subscription(self, period):
        html_customer = load_customer_from_html(self.customer_id)  # we can't rely on DB cache here

        subs_until = (
            max(html_customer.get("subscription", datetime.now().date()), datetime.now().date())
            + period
        )

        data = {
            "card": html_customer["card"],
            "name": html_customer["name"],
            "family": html_customer["family"],
            "phone": html_customer.get("phone_number", None),
            "mail": html_customer.get("email", None),
            "subs": subs_until.strftime("%d.%m.%Y"),
            "subscr": "true" if html_customer["subscr"] else None,
        }
        html_customer = self._http_update_customer(data)

        if html_customer["subscription"] != subs_until:
            raise Exception("Failed to extend a subscription, don't know why.")

        return subs_until

    def orders(self):
        qs = Order.objects.filter(card_id=self.card_id)
        if self.activity_started:
            qs = qs.filter(start_ts__gte=self.activity_started.timestamp())
        if self.activity_ended:
            qs = qs.filter(end_ts__lte=self.activity_ended.timestamp())
        return qs
