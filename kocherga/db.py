import sqlite3
import os
import enum
import logging

import sqlalchemy
from sqlalchemy import Table, Column, String, DateTime, Integer, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

from kocherga.config import config

DB_FILE = config()['kocherga_db_file']

Base = declarative_base()

def engine():
    logging.info(f'Creating an engine for sqlite file {DB_FILE}')
    return sqlalchemy.create_engine('sqlite:///{}'.format(DB_FILE))

def connect():
    return engine().connect()

# Needed in tests. If we don't recreate a Session in fixture then we can't replace the DB file on each test.
def create_session_class():
    # Note that we can't use this in kocherga.api.app because we use async/await and it's incompatible with a simple scoped_session().
    # So kocherga.api.app overrides a Session object.
    return scoped_session(
        sessionmaker(bind=engine())
    )

class WrappedSession:
    def __init__(self):
        self.session = create_session_class()

    def __call__(self):
        return self.session()

    def replace(self, new_session):
        self.session.remove()
        self.session = new_session

    def configure(self, *args, **kwargs):
        return self.session.configure(*args, **kwargs)

    def remove(self):
        return self.session.remove()

Session = WrappedSession()
