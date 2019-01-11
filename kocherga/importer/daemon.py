from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.executors.pool import ProcessPoolExecutor

from datetime import datetime, timedelta

from kocherga.config import TZ

import importlib

IMPORTER_MODULES = [
    "money.cashier",
    "money.ofd.models",
    "money.tochka",
    "zadarma",
    "cm",
    "events.db",
    "watchmen.importer",
    "gitlab",
#    "analytics.timeclub24",
]


def get_importer(module_name):
    module = importlib.import_module(f"kocherga.{module_name}")
    return module.Importer()


def all_importers():
    importers = []
    for module_name in IMPORTER_MODULES:
        importers.append(get_importer(module_name))

    return importers


def run_one(name):
    importer = get_importer(name)
    importer.import_new()


def run():
    scheduler = BlockingScheduler(executors={"default": ProcessPoolExecutor(2)})

    for i, importer in enumerate(all_importers()):
        scheduler.add_job(
            func=importer.__class__.import_new,
            trigger="interval",
            args=[importer],
            name=importer.name,
            **importer.interval(),
            jitter=300,
            start_date=datetime.now(TZ) + timedelta(seconds=i * 5),
        )

    scheduler.start()
