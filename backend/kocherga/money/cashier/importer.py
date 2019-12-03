import logging
logger = logging.getLogger(__name__)

from datetime import datetime
import pandas as pd

from django.conf import settings
from django.db import models

import kocherga.google
import kocherga.importer.base

from .models import CashierItem


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


class Importer(kocherga.importer.base.FullImporter):
    def do_full_import(self):
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
