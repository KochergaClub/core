import logging

logger = logging.getLogger(__name__)

from datetime import datetime, timedelta

import kocherga.importer.base
from kocherga.dateutils import TZ, date_chunks

from . import models


class Importer(kocherga.importer.base.IncrementalImporter):
    def get_initial_dt(self):
        models.OfdFiscalDrive.objects.import_all()
        # take the first shift's date
        first_dts = [
            fiscal_drive.load_first_shift_opened()
            for fiscal_drive in models.OfdFiscalDrive.objects.all()
        ]
        d = min(first_dts)

        # scroll back a few more days, just in case
        d -= timedelta(days=2)

        return datetime.combine(d, datetime.min.time(), tzinfo=TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime) -> datetime:
        fiscal_drives = models.OfdFiscalDrive.objects.all()

        to_d = None
        for (chunk_from_dt, chunk_to_dt) in date_chunks(
            from_dt, to_dt, step=timedelta(days=28)
        ):
            from_d = chunk_from_dt.date()
            to_d = chunk_to_dt.date()

            d = from_d

            while d <= to_d:
                logger.info("importing documents for " + d.strftime("%Y-%m-%d"))
                for fiscal_drive in fiscal_drives:
                    fiscal_drive.import_documents(d)
                d += timedelta(days=1)

            for fiscal_drive in fiscal_drives:
                fiscal_drive.import_shifts(from_date=from_d, to_date=to_d)

        if to_d is None:
            raise Exception("Didn't expect to_d to be None")

        return datetime.combine(to_d, datetime.min.time(), tzinfo=TZ)

    def interval(self):
        return {"minutes": 5}
