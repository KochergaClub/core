import logging
from datetime import datetime

from sqlalchemy import Column, Integer, String
from abc import ABC, abstractmethod

from typing import Any

import kocherga.db
from kocherga.config import TZ

class ImporterState(kocherga.db.Base):
    __tablename__ = 'importers_state'
    name = Column(String, primary_key=True)
    timestamp = Column(Integer)

    @classmethod
    def init_db(cls):
        cls.__table__.create(bind=kocherga.db.engine())

    @property
    def dt(self) -> datetime:
        return datetime.fromtimestamp(self.timestamp)

class ImporterLogEntry(kocherga.db.Base):
    __tablename__ = 'importers_log'
    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    timestamp = Column(Integer)

    def __init__(self, name):
        self.name = name
        self.timestamp = datetime.now(TZ).timestamp()


class BaseImporter(ABC):
    @abstractmethod
    def init_db(self) -> None:
        pass

    @abstractmethod
    def import_new(self) -> None:
        pass

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
        session = kocherga.db.Session()
        self.do_full_import(session)
        session.add(ImporterLogEntry(self.name))
        session.commit()
        logging.info(f'{self.name} imported')


class IncrementalImporter(BaseImporter):
    @abstractmethod
    def get_initial_dt(self) -> datetime:
        pass

    # Should return a datetime of a last imported object or a last datetime that we can be sure won't be needed to be imported again.
    @abstractmethod
    def do_period_import(self, from_dt: datetime, to_dt: datetime, session: object) -> datetime:
        pass

    def _state(self, session: Any) -> ImporterState:
        state = session.query(ImporterState).filter_by(name=self.name).first()
        if state:
            return state
        return ImporterState(name=self.name, timestamp=self.get_initial_dt().timestamp())

    def import_all(self) -> None:
        session = kocherga.db.Session()

        last_dt = self.do_period_import(self.get_initial_dt(), datetime.now(TZ), session)
        state = self._state(session)
        state.timestamp = last_dt.timestamp()
        session.merge(state)
        session.add(ImporterLogEntry(self.name))
        session.commit()
        logging.info(f'{state.name} -> {state.dt}')

    def import_new(self) -> None:
        session = kocherga.db.Session()
        state = self._state(session)

        last_dt = self.do_period_import(state.dt, datetime.now(TZ), session)

        state.timestamp = last_dt.timestamp()
        session.merge(state)
        session.add(ImporterLogEntry(self.name))
        session.commit()
        logging.info(f'{state.name} -> {state.dt}')
