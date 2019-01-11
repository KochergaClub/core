from datetime import datetime
import pandas as pd

from django.db import models

import kocherga.google
import kocherga.config

import kocherga.importer.base


class CashierItem(models.Model):
    class Meta:
        db_table = 'cashier'
        unique_together = (
            ("date", "shift"),
        )

    id = model.IntegerField(primary_key=True)
    date = models.CharField(max_length=40)
    shift = models.CharField(max_length=40)
    watchman = models.CharField(max_length=100)
    cash_income = models.IntegerField()
    electronic_income = models.IntegerField()
    total_income = models.IntegerField()  # could be restored from other data
    current_cash = models.IntegerField()
    notes = models.TextField()
    discrepancy = models.IntegerField() # could be restored from other data
    spendings = models.IntegerField()


def export_to_db():
    gc = kocherga.google.gspread_client()
    gs = gc.open_by_key(kocherga.config.config()["watchmen_spreadsheet_key"])
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

    # TODO - do it in SQLAlchemy ORM way
    df.to_sql("cashier", kocherga.db.connect(), if_exists="replace", index_label="id")


def current_cash():
    item = (
        CashierItem.objects.filter(current_cash__ne = '').order_by('-id')[0]
    )
    return item.current_cash


class Importer(kocherga.importer.base.FullImporter):

    def do_full_import(self, session):
        export_to_db()
