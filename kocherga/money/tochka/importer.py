from datetime import datetime, timedelta

import kocherga.dateutils
from kocherga.dateutils import TZ
import kocherga.importer.base


class Importer(kocherga.importer.base.IncrementalImporter):

    def get_initial_dt(self):
        return datetime(2015, 8, 1, tzinfo=TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime) -> datetime:
        for (chunk_from_dt, chunk_to_dt) in kocherga.dateutils.date_chunks(
            from_dt, to_dt, step=timedelta(days=28)
        ):
            chunk_from_d = (chunk_from_dt - timedelta(days=2)).date()
            chunk_to_d = chunk_to_dt.date()
            logger.info(f"Importing from {chunk_from_d} to {chunk_to_d}")
            for record in get_statements(chunk_from_d, chunk_to_d):
                record.save()

        return to_dt - timedelta(
            days=1
        )  # I'm not sure if tochka statements change after some time or are immutable
