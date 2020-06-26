import logging

logger = logging.getLogger(__name__)

from datetime import datetime, timedelta, date

import kocherga.importer.base
from kocherga.dateutils import TZ
from .api import ofd


def import_date(d: date) -> None:
    documents = ofd.documents(d)

    for document in documents:
        document.save()

    # TODO - import shifts


class Importer(kocherga.importer.base.IncrementalImporter):
    def get_initial_dt(self):
        # take the first shift's date
        d = ofd.shift_opened(1).date()

        # scroll back a few more days just in case
        d -= timedelta(days=2)

        return datetime.combine(d, datetime.min.time(), tzinfo=TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime) -> datetime:
        from_d = from_dt.date()
        to_d = to_dt.date()

        d = from_d

        while d <= to_d:
            logger.info("importing " + d.strftime("%Y-%m-%d"))
            import_date(d)
            d += timedelta(days=1)

        return datetime.combine(to_d, datetime.min.time(), tzinfo=TZ)

    def interval(self):
        return {"minutes": 5}
