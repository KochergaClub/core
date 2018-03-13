import logging
from datetime import datetime, timedelta
import requests

import enum

from sqlalchemy.sql import func, select
from sqlalchemy import Column, DateTime, Integer, Enum

import kocherga.secrets
import kocherga.db

API_URL = 'https://api.ofd-ya.ru/ofdapi/v1'
FISCAL_DRIVE_NUMBER = '8712000101056759'
TOKEN = kocherga.secrets.plain_secret('ofd_ya_token')
DT_FORMAT = '%Y-%m-%d %H:%M:%S'

class CheckType(enum.Enum):
    income = 1
    refund_income = 2
    expense = 3
    refund_expense = 4

class OfdDocument(kocherga.db.Base):
    __tablename__ = 'ofd_documents'
    id = Column(Integer, primary_key=True)
    timestamp = Column('timestamp', DateTime)
    cash = Column('cash', Integer)
    ecash = Column('ecash', Integer)
    check_type = Column('check_type', Enum(CheckType))

    @classmethod
    def from_json(cls, item):
        return OfdDocument(
            id=item['fiscalDocumentNumber'],
            timestamp=datetime.fromtimestamp(item['dateTime']),
            cash=item['cashTotalSum'],
            ecash=item['ecashTotalSum'],
            check_type=CheckType(item['operationType']),
        )

class OfdYaKkt:
    def __init__(self, fiscal_drive_number):
        self.fdnum = fiscal_drive_number

    def request(self, method, params):
        r = requests.post(
            f'{API_URL}/{method}',
            headers={
                'Ofdapitoken': TOKEN,
                'Content-Type': 'application/json',
            },
            json=params
        )
        r.raise_for_status()
        return r.json()

    def documents(self, d):
        items = self.request(
            'documents',
            {
                'fiscalDriveNumber': self.fdnum,
                'date': d.strftime('%Y-%m-%d'),
            }
        ).get('items', [])

        return [OfdDocument.from_json(item) for item in items]


    def shift_opened(self, shift_id):
        items = self.request(
            'documentsShift',
            {
                'fiscalDriveNumber': self.fdnum,
                'shiftNumber': str(shift_id),
                'docType': ['open_shift'],
            }
        ).get('items', [])

        assert len(items) == 1
        return datetime.strptime(items[0]['dateTime'], DT_FORMAT)

ofd = OfdYaKkt(FISCAL_DRIVE_NUMBER)

def import_date(d):
    session = kocherga.db.Session()
    documents = ofd.documents(d)

    session.query(OfdDocument).filter(d <= OfdDocument.timestamp, OfdDocument.timestamp < d + timedelta(days=1))
    for document in documents:
        document = session.merge(document) # not add_all because of a stupid collision on 00:00
    session.commit()

def last_date_with_data():
    db = kocherga.db.connect()
    table = kocherga.db.Tables.ofd_documents
    dt = db.execute(
        select([
            func.max(table.c.timestamp)
        ])
    ).scalar()

    return dt.date()

def import_since(d):
    today_date = datetime.now().date()

    while d <= today_date:
        logging.info('importing ' + d.strftime('%Y-%m-%d'))
        import_date(d)
        d += timedelta(days=1)

def import_new():
    d = last_date_with_data()
    import_since(d)

def import_all():
    # take the first shift's date
    first_d = ofd.shift_opened(1).date()

    # scroll back a few more days just in case
    import_since(first_d - timedelta(days=2))

    # TODO - import shifts
