from datetime import datetime
import pandas as pd

from django.db import models
from django.conf import settings

import kocherga.google

import kocherga.importer.base


class CashierItem(models.Model):
    class Meta:
        db_table = 'cashier'
        unique_together = (
            ("date", "shift"),
        )

    id = models.AutoField(primary_key=True)
    date = models.DateField()
    shift = models.CharField(max_length=40)
    watchman = models.CharField(max_length=100)
    cash_income = models.IntegerField(null=True)
    electronic_income = models.IntegerField(null=True)
    total_income = models.IntegerField(null=True)  # could be restored from other data
    current_cash = models.IntegerField(null=True)
    notes = models.TextField()
    discrepancy = models.IntegerField(null=True) # could be restored from other data
    spendings = models.IntegerField(null=True)


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

    return df


def export_to_db():
    df = load_df_from_google()

    CashierItem.objects.all().delete()

    int_fields = [f.name for f in CashierItem._meta.get_fields() if type(f) == models.fields.IntegerField]

    for row in df.to_dict('records'):
        for int_field in int_fields:
            if row[int_field] == '':
                row[int_field] = None
        CashierItem.objects.create(**row)


def current_cash():
    item = (
        CashierItem.objects.exclude(current_cash = None).order_by('-id')[0]
    )
    return item.current_cash


class Importer(kocherga.importer.base.FullImporter):

    def do_full_import(self, session):
        export_to_db()
