import logging
from datetime import datetime

from sqlalchemy import Column, Integer, String, Text
from abc import ABC, abstractmethod

from typing import Any, Optional

import kocherga.db
from kocherga.db import Session
from kocherga.config import TZ

class ImporterState(kocherga.db.Base):
    __tablename__ = 'importers_state'
    name = Column(String(100), primary_key=True)
    until_ts = Column(Integer)
    last_ts = Column(Integer)
    last_exception = Column(Text)

    @classmethod
    def init_db(cls):
        cls.__table__.create(bind=kocherga.db.engine())

    @property
    def until_dt(self) -> Optional[datetime]:
        if not self.until_ts:
            return None
        return datetime.fromtimestamp(self.until_ts, TZ)

    @property
    def last_dt(self) -> Optional[datetime]:
        if not self.last_ts:
            return None
        return datetime.fromtimestamp(self.last_ts, TZ)

class ImporterLogEntry(kocherga.db.Base):
    __tablename__ = 'importers_log'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), index=True)
    start_ts = Column(Integer)
    end_ts = Column(Integer)
    exception = Column(Text)

    def __init__(self, name):
        self.name = name
        self.start_ts = datetime.now(TZ).timestamp()

class ImportContext:
    def __init__(self, name, mode):
        self.name = name
        self.mode = mode

    def __enter__(self):
        self.log_entry = ImporterLogEntry(self.name)
        self.state = Session().query(ImporterState).filter_by(name=self.name).first()
        if not self.state:
            self.state = ImporterState(name=self.name)
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.state.last_ts = datetime.now(TZ).timestamp()

        if exc_value:
            # let's drop everything from our failed session
            Session.remove()
            self.state.last_exception = str(exc_value)
        else:
            self.state.last_exception = None

        self.log_entry.end_ts = self.state.last_ts
        self.log_entry.exception = self.state.last_exception

        Session().merge(self.state)
        Session().add(self.log_entry)

        Session().commit()
        logging.info(f'{self.name} imported')

class BaseImporter(ABC):
    @abstractmethod
    def init_db(self) -> None:
        pass

    @abstractmethod
    def import_new(self) -> None:
        pass

    @property
    def last_dt(self) -> Optional[datetime]:
        state = Session().query(ImporterState).filter_by(name=self.name).first()
        return state.last_dt

    @property
    def name(self):
        return f'{self.__class__.__module__}.{self.__class__.__name__}'

    def interval(self):
        return {
            'minutes': 15
        }


class FullImporter(BaseImporter):
    @abstractmethod
    def do_full_import(self, session: Any) -> None:
        pass

    def import_new(self) -> None:
        with ImportContext(self.name, 'full') as ic:
            self.do_full_import(Session())


class IncrementalImporter(BaseImporter):
    @abstractmethod
    def get_initial_dt(self) -> datetime:
        pass

    # Should return a datetime of a last imported object or a last datetime that we can be sure won't be needed to be imported again.
    @abstractmethod
    def do_period_import(self, from_dt: datetime, to_dt: datetime, session: object) -> datetime:
        pass

    def _import(self, mode: str) -> None:
        with ImportContext(self.name, mode) as ic:
            if mode == 'all' or not ic.state.until_dt:
                start_dt = self.get_initial_dt()
            else:
                start_dt = ic.state.until_dt

            end_dt = datetime.now(TZ)

            last_dt = self.do_period_import(start_dt, end_dt, Session())
            if not last_dt:
                raise Exception(f"{self.name}.do_period_import didn't return a datetime object")
            ic.state.until_ts = last_dt.timestamp()

    def import_all(self) -> None:
        self._import('all')

    def import_new(self) -> None:
        self._import('new')
