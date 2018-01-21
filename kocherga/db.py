import sqlite3
import os
import enum

import sqlalchemy
from sqlalchemy import Table, Column, String, DateTime, Integer, Enum

from kocherga.config import config

DB_FILE = config()['kocherga_db_file']

def engine():
    return sqlalchemy.create_engine('sqlite:///{}'.format(DB_FILE))

metadata = sqlalchemy.MetaData()

class CheckType(enum.Enum):
    income = 1
    refund_income = 2
    expense = 3
    refund_expense = 4


class Tables:
    watchmen_schedule = Table('watchmen_schedule', metadata,
                              Column('date', String),
                              Column('shift', String),
                              Column('watchman', String)
    )
    ofd_documents = Table('ofd_documents', metadata,
                              Column('timestamp', DateTime),
                              Column('cash', Integer),
                              Column('ecash', Integer),
                              Column('check_type', Enum(CheckType))
    )


def create_all():
    metadata.create_all(engine())

def connect():
    return engine().connect()
