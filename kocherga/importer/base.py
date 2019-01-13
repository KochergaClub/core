import logging
from datetime import datetime

from abc import ABC, abstractmethod

from typing import Any, Optional

from kocherga.config import TZ

import django.db

from .models import State, LogEntry


class ImportContext:

    def __init__(self, name, mode):
        self.name = name
        self.mode = mode

    def __enter__(self):
        django.db.transaction.set_autocommit(False)

        self.log_entry = LogEntry(name=self.name)

        try:
            self.state = State.objects.get(name=self.name)
        except State.DoesNotExist:
            self.state = State(name=self.name)

        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_value:
            # roll back everything done by importer
            self.state.last_exception = str(exc_value)
            django.db.transaction.rollback()
        else:
            self.state.last_exception = None
            django.db.transaction.commit()

        self.state.last_dt = datetime.now(TZ)

        self.log_entry.end_dt = self.state.last_dt
        self.log_entry.exception = self.state.last_exception

        self.state.save()
        self.log_entry.save()

        django.db.transaction.set_autocommit(True)
        django.db.transaction.commit()

        logging.info(f"{self.name} imported")


class BaseImporter(ABC):
    @abstractmethod
    def import_new(self) -> None:
        pass

    @property
    def last_dt(self) -> Optional[datetime]:
        try:
            state = State.objects.get(name=self.name)
        except State.DoesNotExist:
            return None

        return state.last_dt

    @property
    def name(self):
        return f"{self.__class__.__module__}.{self.__class__.__name__}"

    def interval(self):
        return {"minutes": 15}


class FullImporter(BaseImporter):

    @abstractmethod
    def do_full_import(self, session: Any) -> None:
        pass

    def import_new(self) -> None:
        with ImportContext(self.name, "full") as ic:
            self.do_full_import(None)


class IncrementalImporter(BaseImporter):

    @abstractmethod
    def get_initial_dt(self) -> datetime:
        pass

    # Should return a datetime of a last imported object or a last datetime that we can be sure won't be needed to be imported again.
    @abstractmethod
    def do_period_import(
        self, from_dt: datetime, to_dt: datetime, session: object
    ) -> datetime:
        pass

    def _import(self, mode: str) -> None:
        with ImportContext(self.name, mode) as ic:
            if mode == "all" or not ic.state.until_dt:
                start_dt = self.get_initial_dt()
            else:
                start_dt = ic.state.until_dt

            end_dt = datetime.now(TZ)

            last_dt = self.do_period_import(start_dt, end_dt, None)
            if not last_dt:
                raise Exception(
                    f"{self.name}.do_period_import didn't return a datetime object"
                )
            ic.state.until_dt = last_dt

    def import_all(self) -> None:
        self._import("all")

    def import_new(self) -> None:
        self._import("new")
