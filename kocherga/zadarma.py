import csv
import requests
from collections import defaultdict
from datetime import datetime, timedelta
import enum
import io
import logging

from typing import DefaultDict, Dict, Iterator, List

import kocherga.db
import kocherga.secrets

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

    if not text.startswith('id;call_type'):
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

def fetch_all_calls(from_dt=datetime(2015,9,1)) -> Iterator[Call]:
    STEP = timedelta(days=28)

    to_dt = from_dt + STEP

    while from_dt < datetime.now():
        logging.info(f'Fetching from {from_dt} to {to_dt}')
        for call in fetch_calls(from_dt, to_dt):
            yield call

        from_dt += STEP
        to_dt += STEP

def import_all(from_dt=datetime(2015,9,1)):
    session = kocherga.db.Session()

    logging.info(f'Importing all calls')

    for call in fetch_all_calls(from_dt):
        session.merge(call)

    session.commit()
