import csv
import requests
from collections import defaultdict
from datetime import datetime, timedelta
import enum
import io
import logging

from typing import DefaultDict, Dict, Iterator, List

from kocherga.config import TZ
import kocherga.db
import kocherga.datetime
import kocherga.secrets
import kocherga.watchmen
import kocherga.importer.base

from sqlalchemy import Column, Integer, String, Enum

SECRET = kocherga.secrets.plain_secret('zadarma_api_key')

class CallType(enum.Enum):
    incoming = 1
    outcoming = 2

    @classmethod
    def from_str(cls, s: str) -> 'CallType':
        return {
            'in': cls.incoming,
            'out': cls.outcoming,
        }[s]

class Disposition(enum.Enum):
    answered = 1
    no_answer = 2
    busy = 3
    call_failed = 4

    @classmethod
    def from_str(cls, s: str) -> 'Disposition':
        s = s.replace(' ', '_')
        return cls[s]

class Call(kocherga.db.Base):
    __tablename__ = 'zadarma_calls'
    call_id = Column(String, primary_key=True)
    call_type = Column(Enum(CallType))
    internal_number = Column(String)
    caller_number = Column(String)
    destination_number = Column(String)
    disposition = Column(Enum(Disposition))
    ts = Column(Integer)
    wait_seconds = Column(Integer)
    seconds = Column(Integer)
    watchman = Column(String)

    @classmethod
    def from_csv_rows(cls, rows: List[Dict[str, str]]) -> 'Call':
        if len(rows) > 2:
            # I expect this can happen if we ever implement manual call redirects
            raise Exception(f"Didn't expect to get more than two rows, call_id = {rows[0]['call_id']}")

        row1 = rows[0]
        call = Call(
            call_id=row1['call_id'],
            call_type=CallType.from_str(row1['call_type']),
            caller_number=row1['clid'],
            destination_number=row1['destination'],
            internal_number=row1['internal_number'],
            disposition=Disposition.from_str(row1['disposition']),
            ts=datetime.strptime(row1['date'], '%Y-%m-%d %H:%M:%S').timestamp(),
            seconds=int(row1['seconds']),
        )

        if len(rows) == 2:
            row2 = rows[1]
            assert row2['call_id'] == row1['call_id']
            if call.call_type != CallType.incoming:
                raise Exception("Can't parse two-rows format for anything except incoming calls")
            call.internal_number = row2['internal_number']

            call.wait_seconds = call.seconds
            call.seconds = row2['seconds']

        return call

def api_text_to_row_groups(text: str) -> Iterator[List[Dict[str, str]]]:
    if text.startswith('Вы уже использовали'):
        raise Exception(f'Temporarily banned by API: {text}')

    # Arrayid is a weird header for some older requests but they seem fine otherwise
    if not text.startswith('id;call_type') and not text.startswith('Arrayid;call_type'):
        raise Exception(f'Unexpected response {text}')

    reader = csv.DictReader(io.StringIO(text), delimiter=';')

    rows_by_call_id = defaultdict(list) # type: DefaultDict[str, List[Dict[str, str]]]
    for row in reader:
        rows_by_call_id[row['call_id']].append(row)

    logging.info(f'Got {len(rows_by_call_id)} rows')

    for (call_id, rows) in rows_by_call_id.items():
        yield rows

def fetch_csv_row_groups(from_dt: datetime, to_dt: datetime) -> Iterator[List[Dict[str, str]]]:
    logging.info(f'Fetching from {from_dt} to {to_dt}')
    api_params={
        'secret': SECRET,
        'start': from_dt.strftime('%Y%m%d%H%M%S'),
        'end': to_dt.strftime('%Y%m%d%H%M%S'),
        'format': 'new',
    }
    r = requests.get(
        'https://my.zadarma.com/mypbx/stat/export',
        params=api_params
    )

    r.raise_for_status()

    return api_text_to_row_groups(r.text)

def fetch_calls(from_dt: datetime, to_dt: datetime) -> Iterator[Call]:
    for rows in fetch_csv_row_groups(from_dt, to_dt):
        yield Call.from_csv_rows(rows)

def fetch_all_calls(from_dt=datetime(2015,9,1,tzinfo=TZ), to_dt=None) -> Iterator[Call]:
    api_requests = 0
    for (chunk_from_dt, chunk_to_dt) in kocherga.datetime.date_chunks(from_dt, to_dt, timedelta(days=28)):
        logging.info(f'Fetching from {chunk_from_dt} to {chunk_to_dt}')
        counter = 0
        for call in fetch_calls(chunk_from_dt, chunk_to_dt):
            yield call
            counter += 1
        logging.info(f'Fetched {counter} calls')

        # We shouldn't make too many API requests in a row - we'll get banned.
        # This early break helps the importer to finish the full import in several portions.
        api_requests += 1
        if api_requests >= 10:
            break

class Importer(kocherga.importer.base.IncrementalImporter):
    def get_initial_dt(self):
        return datetime(2015,9,1,tzinfo=TZ)

    def init_db(self):
        Call.__table__.create(bind=kocherga.db.engine())

    def do_period_import(self, from_dt: datetime, to_dt: datetime, session) -> datetime:
        last_call = None

        schedule = kocherga.watchmen.load_schedule()

        for call in fetch_all_calls(from_dt, to_dt):
            watchman = schedule.watchman_by_dt(datetime.fromtimestamp(call.ts, TZ))
            call.watchman = watchman
            session.merge(call)
            last_call = call

        if last_call:
            return datetime.fromtimestamp(last_call.ts, TZ)
        else:
            return from_dt
