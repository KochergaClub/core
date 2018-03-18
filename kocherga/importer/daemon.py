from apscheduler.schedulers.blocking import BlockingScheduler

from datetime import datetime

from kocherga.config import TZ

import kocherga.money.tochka
import kocherga.money.ofd
import kocherga.money.cashier
import kocherga.zadarma
import kocherga.cm
import kocherga.events.db
import kocherga.watchmen

def all_importers():
    return [
        kocherga.money.ofd.Importer(),
        kocherga.money.tochka.Importer(),
        kocherga.zadarma.Importer(),
        kocherga.events.db.Importer(),
        kocherga.cm.Importer(),
        kocherga.watchmen.Importer(),
    ]

def run():
    scheduler = BlockingScheduler()
    scheduler.add_executor('processpool')

    for importer in all_importers():
        scheduler.add_job(
            func=importer.__class__.import_new,
            trigger='interval',
            args=[importer],
            name=importer.name,
            **importer.interval(),
            start_date=datetime.now(TZ),
        )

    scheduler.start()
