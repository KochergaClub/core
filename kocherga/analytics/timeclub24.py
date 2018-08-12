from telethon import TelegramClient
import socks

import time
from datetime import datetime
import re

from sqlalchemy import Column, String, Integer, DateTime, UniqueConstraint

import kocherga.db
import kocherga.importer.base
import kocherga.telegram.core_api

TIMECLUB_BOT = 'timeclub24_bot'

class Timeclub24Visitors(kocherga.db.Base):
    __tablename__ = "timeclub24_visitors"
    __table_args__ = (UniqueConstraint("ts", "venue"),)

    id = Column(Integer, primary_key=True)
    ts = Column(DateTime, default=datetime.now)
    venue = Column(String(100), nullable=False)
    visitors = Column(Integer)

class Importer(kocherga.importer.base.FullImporter):
    def do_full_import(self, session):
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

            session.add(Timeclub24Visitors(
                ts=ts,
                venue=venue,
                visitors=int(visitors),
            ))
