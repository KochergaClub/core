from datetime import datetime
import pandas as pd

import kocherga.google
import kocherga.watchmen
import kocherga.db

import kocherga.importer.base

from sqlalchemy import Column, String, Integer, UniqueConstraint

class CashierItem(kocherga.db.Base):
    __tablename__ = 'cashier'
    __table_args__ = (
        UniqueConstraint('date', 'shift', name='cashier_shift_pair'),
    )

    id = Column(Integer, primary_key=True)
    date = Column(String)
    shift = Column(String)
    watchman = Column(String)
    cash_income = Column(Integer)
    electronic_income = Column(Integer)
    total_income = Column(Integer) # could be restored from other data
    current_cash = Column(Integer)
    notes = Column(String)
    discrepancy = Column(Integer) # could be restored from other data
    spendings = Column(Integer)

def export_to_db():
    gc = kocherga.google.gspread_client()
    gs = gc.open_by_key(kocherga.watchmen.WATCHMEN_SPREADSHEET_KEY)
    gw = gs.worksheet('Деньги')
    df = pd.DataFrame(gw.get_all_records())
    df = df[df.Дата != '']
    df.Дата = df.Дата.map(lambda date_str: datetime.strptime(date_str, '%d.%m.%Y').date())

    df = df.rename(columns={
        'Дата': 'date',
        'Смена': 'shift',
        'Админ': 'watchman',
        'Доход нал': 'cash_income',
        'Доход безнал': 'electronic_income',
        'Доход всего': 'total_income',
        'Касса': 'current_cash',
        'Примечания': 'notes',
        'Расхождение': 'discrepancy',
        'Расходы': 'spendings',
    })

    # TODO - do it in SQLAlchemy ORM way
    df.to_sql(
        'cashier', kocherga.db.connect(),
        if_exists='replace',
        index_label='id',
    )

def current_cash():
    item = kocherga.db.Session().query(CashierItem).order_by(CashierItem.id.desc()).first()
    return item.current_cash

class Importer(kocherga.importer.base.FullImporter):
    def init_db(self):
        pass

    def do_full_import(self, session):
        export_to_db()
