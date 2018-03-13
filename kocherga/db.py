import sqlite3
import os
import enum

import sqlalchemy
from sqlalchemy import Table, Column, String, DateTime, Integer, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from kocherga.config import config

DB_FILE = config()['kocherga_db_file']

def engine():
    return sqlalchemy.create_engine('sqlite:///{}'.format(DB_FILE))

metadata = sqlalchemy.MetaData()

Base = declarative_base()

class Tables:
    watchmen_schedule = Table('watchmen_schedule', metadata,
                              Column('date', String),
                              Column('shift', String),
                              Column('watchman', String)
    )


def create_all():
    e = engine()
    metadata.create_all(e)
    Base.metadata.create_all(e) # this doesn't create *everything*, just definitions that we've imported so far

def connect():
    return engine().connect()

# Needed in tests. If we don't recreate a Session in fixture then we can't replace the DB file on each test.
def create_session_class():
    return sessionmaker(bind=engine())

Session = create_session_class()
