import logging

logger = logging.getLogger(__name__)

from datetime import datetime
import sys
from abc import ABC, abstractmethod
from typing import Optional

from kocherga.dateutils import TZ

from django.db import transaction

from .models import State, LogEntry
from .prometheus import success_counter, failure_counter


class ImportSession:
    def __init__(self, name, mode):
        self.name = name
        self.mode = mode

        self.log_entry = LogEntry(name=self.name)

        try:
            self.state = State.objects.get(name=self.name)
        except State.DoesNotExist:
            self.state = State(name=self.name)

    def save(self, exc_info=None):
        if exc_info:
            # roll back everything done by importer
            self.state.last_exception = str(exc_info[1])
            logger.info('Incrementing failure_counter')
            failure_counter.labels(importer=self.name).inc()
        else:
            self.state.last_exception = None
            logger.info('Incrementing success_counter')
            success_counter.labels(importer=self.name).inc()

        self.state.last_dt = datetime.now(TZ)

        self.log_entry.end_dt = self.state.last_dt
        self.log_entry.exception = self.state.last_exception

        self.state.save()
        self.log_entry.save()
        logging.info(f"{self.name} imported")


class BaseImporter(ABC):
    @abstractmethod
    def import_new(self) -> None:
        ...

    @property
    def state(self) -> State:
        (state, _) = State.objects.get_or_create(name=self.name)
        return state

    @property
    def last_dt(self) -> Optional[datetime]:
        return self.state.last_dt

    @property
    def name(self):
        return f"{self.__class__.__module__}.{self.__class__.__name__}"

    def interval(self):
        return {"minutes": 15}


class FullImporter(BaseImporter):
    @abstractmethod
    def do_full_import(self) -> None:
        ...

    def import_new(self) -> None:
        session = ImportSession(self.name, 'full')

        try:
            with transaction.atomic():
                self.do_full_import()
            session.save()
        except BaseException:
            session.save(sys.exc_info())
            raise


class IncrementalImporter(BaseImporter):
    @abstractmethod
    def get_initial_dt(self) -> datetime:
        ...

    # Should return a datetime of a last imported object or a last datetime
    # that we can be sure won't be needed to be imported again.
    @abstractmethod
    def do_period_import(self, from_dt: datetime, to_dt: datetime) -> datetime:
        ...

    def _import(self, mode: str) -> None:
        session = ImportSession(self.name, mode)

        try:
            with transaction.atomic():
                if mode == "all" or not session.state.until_dt:
                    start_dt = self.get_initial_dt()
                else:
                    start_dt = session.state.until_dt

                end_dt = datetime.now(TZ)

                last_dt = self.do_period_import(start_dt, end_dt)
                if not last_dt:
                    raise Exception(
                        f"{self.name}.do_period_import didn't return a datetime object"
                    )
                session.state.until_dt = last_dt
            session.save()
        except BaseException:
            session.save(sys.exc_info())
            raise

    def import_all(self) -> None:
        self._import("all")

    def import_new(self) -> None:
        self._import("new")
