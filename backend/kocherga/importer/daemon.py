import logging

logger = logging.getLogger(__name__)

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.executors.pool import ThreadPoolExecutor
from apscheduler.jobstores.redis import RedisJobStore

from datetime import datetime, timedelta
import time
from typing import Any

import importlib

from django.conf import settings
from kocherga.redis import get_redis_connect_args

from .prometheus import importers_gauge, success_counter, failure_counter

IMPORTER_MODULES = [
    # "analytics.timeclub24.models",
    # "gitlab.models",
    # "cm",
    "money.cashier",
    "money.ofd",
    "money.tochka",
    "zadarma",
    "timepad",
    "slack",
    "email",
    "zoom",
    "telegram",
]


def get_importer(module_name):
    module: Any = importlib.import_module(f"kocherga.{module_name}.importer")
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
    # Daemon can be disabled in development to avoid importing too much production data.
    if settings.KOCHERGA_IMPORTER_DISABLED:
        # Auto-detect settings change?
        while True:
            # Logging for clarity about what's going on.
            logger.info('Importer daemon disabled.')
            time.sleep(60)

    scheduler = BlockingScheduler(
        executors={"default": ThreadPoolExecutor(2)},
        jobstores={"default": RedisJobStore(**get_redis_connect_args())},
    )

    importers = all_importers()
    importers_gauge.set(len(all_importers()))

    for i, importer in enumerate(importers):
        success_counter.labels(importer=importer.name).inc(0)
        failure_counter.labels(importer=importer.name).inc(0)

        scheduler.add_job(
            id=importer.name,
            name=importer.name,
            replace_existing=True,
            coalesce=True,
            func=importer.__class__.import_new,
            args=[importer],
            trigger="interval",
            **importer.interval(),
            jitter=300,
            start_date=datetime.now() + timedelta(seconds=i * 5),
        )

    scheduler.start()
