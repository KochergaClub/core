from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.executors.pool import ThreadPoolExecutor

from datetime import datetime, timedelta

import importlib

from .prometheus import importers_gauge, success_counter, failure_counter

IMPORTER_MODULES = [
    # "analytics.timeclub24.models",
    # "gitlab.models",
    "cm",
    "events",
    "money.cashier",
    "money.ofd",
    "money.tochka",
    "zadarma",
    "timepad",
    "slack",
]


def get_importer(module_name):
    module = importlib.import_module(f"kocherga.{module_name}.importer")
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
    scheduler = BlockingScheduler(executors={
        "default": ThreadPoolExecutor(2)
    })

    importers = all_importers()
    importers_gauge.set(len(all_importers()))

    for i, importer in enumerate(importers):
        success_counter.labels(importer=importer.name).inc(0)
        failure_counter.labels(importer=importer.name).inc(0)

        scheduler.add_job(
            func=importer.__class__.import_new,
            trigger="interval",
            args=[importer],
            name=importer.name,
            **importer.interval(),
            jitter=300,
            start_date=datetime.now() + timedelta(seconds=i * 5),
        )

    scheduler.start()
