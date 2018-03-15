from datetime import datetime

from apscheduler.schedulers.blocking import BlockingScheduler

from abc import ABC, abstractmethod

import kocherga.money.tochka
import kocherga.money.ofd
import kocherga.zadarma
import kocherga.cm

class ImporterBase(ABC):

    @abstractmethod
    def import_all(self):
        pass

    @abstractmethod
    def import_since(self, dt: datetime):
        pass

    @abstractmethod
    def init_db(self):
        pass

    def import_new(self):
        # TODO - load timestamp, call import_since, save timestamp
        raise NotImplementedError

    def period(self):
        ...

def all_importers():
    return [
        kocherga.cm.importer,
        kocherga.zadarma.importer,
        kocherga.money.ofd.importer,
        kocherga.money.tochka.importer,
    ]

def importer_daemon():
    scheduler = BlockingScheduler()
    scheduler.add_executor('processpool')

    for importer in all_importers():
        scheduler.add_job(importer.import_new, 'interval', minutes=1)

    scheduler.start()
