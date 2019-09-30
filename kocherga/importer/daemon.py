import concurrent.futures
from concurrent.futures.process import BrokenProcessPool

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.executors.pool import ProcessPoolExecutor

from datetime import datetime, timedelta

import importlib

IMPORTER_MODULES = [
    # "analytics.timeclub24.models",
    "cm.importer",
    "events.importer",
    # "gitlab.models",
    "money.cashier.importer",
    "money.ofd.importer",
    "money.tochka.importer",
    "zadarma.importer",
    "timepad.importer",
    "slack.importer",
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


# Fix "A process in the process pool was terminated abruptly", via https://github.com/agronholm/apscheduler/issues/362
class FixedPoolExecutor(ProcessPoolExecutor):
    def __init__(self, max_workers=10):
        self._max_workers = max_workers
        super().__init__(max_workers)

    def _do_submit_job(self, job, run_times):
        try:
            return super()._do_submit_job(job, run_times)
        except BrokenProcessPool:
            self._logger.warning('Process pool is broken. Restarting executor.')
            self._pool.shutdown(wait=True)
            self._pool = concurrent.futures.ProcessPoolExecutor(int(self._max_workers))

            return super()._do_submit_job(job, run_times)


def run():
    scheduler = BlockingScheduler(executors={
        "default": FixedPoolExecutor(2)
    })

    for i, importer in enumerate(all_importers()):
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
