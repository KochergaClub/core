import requests
import logging
from datetime import datetime
import time
import xml.etree.ElementTree as ET

from sqlalchemy import Column, Integer, String, Numeric, Boolean

from typing import Any, List

import kocherga.secrets
import kocherga.db
import kocherga.datetime
from kocherga.config import TZ

# Secret tochka API docs: https://apitochka.docs.apiary.io/

class Record(kocherga.db.Base):
    __tablename__ = 'tochka_records'
    id = Column(String, primary_key=True)
    ts = Column(Integer)
    debit = Column(Boolean)
    purpose = Column(String)
    document_type = Column(Integer)
    total = Column(Numeric(10, 2))

    @classmethod
    def from_element(cls, record):
        dt_str = record.get('origin_date')
        if ":" == dt_str[-3:-2]:
            dt_str = dt_str[:-3] + dt_str[-2:]
        dt = datetime.strptime(dt_str, '%Y-%m-%dT%H:%M:%S%z')

        return cls(
            id=record.get('core_banking_id'),
            ts=dt.timestamp(),
            purpose=record.get('purpose'),
            total=float(record.get('sum')),
            document_type=int(record.get('document_type')),
            debit=(record.get('debit') == 'true'),
        )


def get_access_token():
    credentials = kocherga.secrets.json_secret('tochka_credentials')
    username = credentials['username']
    password = credentials['password']

    r = requests.post(
        'https://api.tochka.com/auth/oauth/token',
        data={
            'username': username,
            'password': password,
            'grant_type': 'password',
        },
        headers={
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic aXBob25lYXBwOnNlY3JldA==' # fixed string, see https://apitochka.docs.apiary.io/#reference/0/oauth-20/accestoken
        }
    )
    r.raise_for_status()

    return r.json()['access_token']

def xml_request(token: str, method: str, xml: str):
    r = requests.post(
        f'https://api.tochka.com/ws/do/{method}',
        data=xml,
        headers={
            'Content-Type': 'application/xml',
            'Authorization': f'Bearer {token}',
            'Accept': 'application/xml',
        },
    )
    r.raise_for_status()
    return ET.fromstring(r.text)

def get_account_id(token: str) -> str:
    request_xml = '''
    <message_v1 xmlns="http://www.anr.ru/types" type="request">
      <data trn_code="Q0112"></data>
    </message_v1>
    '''

    response = xml_request(token, 'Q0112', request_xml)
    accounts = response.findall("./data/knopka_account_summaries/accounts_wrapper/accounts")
    assert len(accounts) == 1
    return accounts[0].findtext("./accountId")


def get_statements(token: str, from_dt: datetime, to_dt: datetime) -> List[Any]:
    if not from_dt.tzname():
        raise Exception('Timezone-aware from_dt is required')
    if not to_dt.tzname():
        raise Exception('Timezone-aware from_dt is required')
    account_id = get_account_id(token)

    request_xml = f'''
    <message_v1 xmlns="http://www.anr.ru/types" type="request">
      <data trn_code="R0100">
        <statement_request_v1
            xmlns="http://www.anr.ru/types"
            account_id="{account_id}"
            start_date="{from_dt.isoformat('T', 'seconds')}"
            end_date="{to_dt.isoformat('T', 'seconds')}"
        >
        </statement_request_v1>
      </data>
    </message_v1>
    '''
    response = xml_request(token, 'R0100', request_xml)

    state = response.find('./state_info').get('state')
    if state != 'accepted':
        raise Exception(f'Asked for statement, got bad state {state}')

    int_id = response.get('int_id')

    request_xml = f'''
      <message_v1 type="request" int_id="{int_id}">
        <data trn_code="R0101"></data>
      </message_v1>
    '''

    step = 1
    max_step = 60
    max_wait = 600
    total_wait = 0
    statement = None
    while total_wait < max_wait:
        response = xml_request(token, 'R0101', request_xml)
        state = response.find('./state_info').get('state')
        logging.info(f'State: {state}')
        if state == 'failed':
            raise Exception('Statement request resulted in state=failed')

        statement = response.find('./data/statement_response_v1')
        if statement:
            break

        step = min(step, max_wait - total_wait)
        logging.info(f'No statement, waiting for {step} seconds')
        time.sleep(step)
        total_wait += step
        if step < max_step:
            step = min(step + 1, max_step)

    if not statement:
        raise Exception(f'Waited for {total_wait} seconds and still got no statement')

    for item in statement.findall('./days/day/records/record'):
        yield Record.from_element(item)

def import_all():
    session = kocherga.db.Session()

    token = get_access_token() # TODO - cache
    for (from_dt, to_dt) in kocherga.datetime.date_chunks(datetime(2015,8,1,tzinfo=TZ), datetime.now(TZ)):
        logging.info(f'Importing from {from_dt} to {to_dt}')
        for record in get_statements(token, from_dt, to_dt):
            session.merge(record)

    session.commit()

def init_db():
    Record.__table__.create(bind=kocherga.db.engine())
