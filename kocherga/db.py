import logging
logger = logging.getLogger(__name__)

import sqlite3
import os
import enum
import sqlalchemy
from sqlalchemy import Table, Column, String, DateTime, Integer, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

from kocherga.config import config

DB_URL = config()['kocherga_db']

Base = declarative_base()

def engine():
    logger.info(f'Creating an engine for {DB_URL}')
    return sqlalchemy.create_engine(DB_URL, pool_pre_ping=True)

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
        self.session.close()
        self.session.remove()
        self.session = new_session

    def configure(self, *args, **kwargs):
        return self.session.configure(*args, **kwargs)

    def remove(self):
        self.session.close()
        return self.session.remove()

Session = WrappedSession()
