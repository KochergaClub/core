import logging
from datetime import datetime, timedelta
import requests
from sqlalchemy.sql import func, select

import kocherga.secrets
import kocherga.db

API_URL = 'https://api.ofd-ya.ru/ofdapi/v1'
FISCAL_DRIVE_NUMBER = '8712000101056759'
TOKEN = kocherga.secrets.plain_secret('ofd_ya_token')

def import_from_ofdya(d):
    r = requests.post(
        '{}/documents'.format(API_URL),
        headers={
            'Ofdapitoken': TOKEN,
            'Content-Type': 'application/json',
        },
        json={
            "fiscalDriveNumber": FISCAL_DRIVE_NUMBER,
            "date": d.strftime('%Y-%m-%d')
        }
    )
    r.raise_for_status()

    db = kocherga.db.connect()
    table = kocherga.db.Tables.ofd_documents
    with db:
        db.execute(table.delete().where(d <= table.c.timestamp).where(table.c.timestamp < d + timedelta(days=1)))
        db.execute(table.insert(), [
            {
                'timestamp': datetime.fromtimestamp(item['dateTime']),
                'cash': item['cashTotalSum'],
                'ecash': item['ecashTotalSum'],
                'check_type': kocherga.db.CheckType(item['operationType']),
            }
            for item in r.json().get('items', [])
        ])

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
        import_from_ofdya(d)
        d += timedelta(days=1)

def import_new():
    d = last_date_with_data()
    import_since(d)
