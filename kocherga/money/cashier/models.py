import logging
logger = logging.getLogger(__name__)

from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone

from datetime import datetime
import pandas as pd

import kocherga.google
import kocherga.importer.base


class CashierItem(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField()
    shift = models.CharField(max_length=40)
    watchman = models.CharField(max_length=100)
    cash_income = models.IntegerField(null=True)
    electronic_income = models.IntegerField(null=True)
    total_income = models.IntegerField(null=True)  # could be restored from other data
    current_cash = models.IntegerField(null=True)
    notes = models.TextField()
    discrepancy = models.IntegerField(null=True)  # could be restored from other data
    spendings = models.IntegerField(null=True)

    class Meta:
        db_table = 'cashier'

    def __str__(self):
        return f'[{self.date} {self.shift}] {self.cash_income} + {self.electronic_income} = {self.total_income}'


class Payment(models.Model):
    whom = models.ForeignKey(
        get_user_model(),
        verbose_name='Кому',
        on_delete=models.CASCADE,
        related_name='payments',
    )
    amount = models.IntegerField('Сумма')
    created_dt = models.DateTimeField('Дата создания', auto_now_add=True)
    redeem_dt = models.DateTimeField('Дата получения', null=True, blank=True)
    comment = models.TextField('Комментарий', blank=True)

    class Meta:
        verbose_name = 'Выплата'
        verbose_name_plural = 'Выплаты'
        permissions = (
            ('create', 'Может выписывать новые чеки'),
            ('redeem', 'Может обналичивать существующие чеки'),
        )

    def __str__(self):
        result = f'{self.amount} -> {self.whom}'
        if self.comment:
            result += ': ' + self.comment
        return result

    def is_redeemed(self):
        return self.redeem_dt is not None
    is_redeemed.boolean = True

    def redeem(self):
        if self.is_redeemed():
            raise Exception("Payment is already redeemed")
        self.redeem_dt = timezone.now()
        self.save()


def load_df_from_google():
    gc = kocherga.google.gspread_client()
    gs = gc.open_by_key(settings.KOCHERGA_WATCHMEN_SPREADSHEET_KEY)
    gw = gs.worksheet("Деньги")
    df = pd.DataFrame(gw.get_all_records())
    df = df[df.Дата != ""]
    df.Дата = df.Дата.map(
        lambda date_str: datetime.strptime(date_str, "%d.%m.%Y").date()
    )

    df = df.rename(
        columns={
            "Дата": "date",
            "Смена": "shift",
            "Админ": "watchman",
            "Доход нал": "cash_income",
            "Доход безнал": "electronic_income",
            "Доход всего": "total_income",
            "Касса": "current_cash",
            "Примечания": "notes",
            "Расхождение": "discrepancy",
            "Расходы": "spendings",
        }
    )
    if '' in df.columns:
        df = df.drop(columns='')  # extra comments in empty columns can break the importer

    return df


def export_to_db():
    logger.info('Loading cashier data from google')
    df = load_df_from_google()

    int_fields = [f.name for f in CashierItem._meta.get_fields() if type(f) == models.fields.IntegerField]

    logger.info('Saving cashier items to DB')
    for i, row in enumerate(df.to_dict('records')):
        for int_field in int_fields:
            if row[int_field] == '' or row[int_field] == ' ':
                row[int_field] = None

        pk = i + 1  # db ids start from 1
        CashierItem.objects.update_or_create(id=pk, defaults=row)


def current_cash():
    item = (
        CashierItem.objects.exclude(current_cash=None).order_by('-id')[0]
    )
    return item.current_cash


class Importer(kocherga.importer.base.FullImporter):

    def do_full_import(self):
        export_to_db()
