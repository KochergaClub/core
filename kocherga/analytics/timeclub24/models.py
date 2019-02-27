import time
from datetime import datetime
import re

from django.db import models

import kocherga.importer.base
import kocherga.telegram.core_api
from kocherga.dateutils import TZ

TIMECLUB_BOT = 'timeclub24_bot'


def dt_now():
    return datetime.now(TZ)


class Timeclub24Visitors(models.Model):
    class Meta:
        db_table = 'timeclub24_visitors'
        unique_together = (
            ("ts", "venue"),
        )

    id = models.AutoField(primary_key=True)
    ts = models.DateTimeField(default=dt_now)
    venue = models.CharField(max_length=100)
    visitors = models.IntegerField()


class Importer(kocherga.importer.base.FullImporter):
    def do_full_import(self):
        client = kocherga.telegram.core_api.get_client()
        client.send_message(TIMECLUB_BOT, 'Загруженность клубов')
        time.sleep(3)
        message = client.get_messages(TIMECLUB_BOT)[0].message

        parts = message.split('\n')
        ts = datetime.now()
        for part in parts:
            match = re.match(r'(.*): (\d+)$', part)
            if not match:
                raise Exception(f"Can't parse message: {message}")
            (venue, visitors) = match.groups()

            Timeclub24Visitors(
                ts=ts,
                venue=venue,
                visitors=int(visitors),
            ).save()
