from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.executors.pool import ProcessPoolExecutor

from datetime import datetime, timedelta

from kocherga.config import TZ

import importlib

IMPORTER_MODULES = [
    'money.cashier',
    'money.ofd',
    'money.tochka',
    'zadarma',
    'cm',
    'events.db',
    'watchmen',
    'gitlab'
]

def all_importers():
    importers = []
    for module_name in IMPORTER_MODULES:
        module = importlib.import_module(f'kocherga.{module_name}')
        importers.append(module.Importer()) # type: ignore

    return importers

def run():
    scheduler = BlockingScheduler(
        executors={
            'default': ProcessPoolExecutor(3),
        }
    )

    for i, importer in enumerate(all_importers()):
        scheduler.add_job(
            func=importer.__class__.import_new,
            trigger='interval',
            args=[importer],
            name=importer.name,
            **importer.interval(),
            start_date=datetime.now(TZ) + timedelta(seconds=i*5),
        )

    scheduler.start()
