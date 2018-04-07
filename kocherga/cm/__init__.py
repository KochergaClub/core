import re
from io import StringIO

from collections import namedtuple, OrderedDict
from datetime import datetime
import csv
import requests

from typing import List

from kocherga.config import TZ
import kocherga.secrets
import kocherga.importer.base

from sqlalchemy import inspect, Column, Integer, String, Text

DOMAIN = kocherga.secrets.plain_secret('cafe_manager_server')

class Order(kocherga.db.Base):
    __tablename__ = 'cm_orders'

    order_id = Column(Integer, info={ 'ru_title': 'Номер заказа' }, primary_key=True)
    card_id = Column(Integer, info={ 'ru_title': 'Номер карты' })
    start_ts = Column(Integer)
    end_ts = Column(Integer)
    people = Column(Integer, info={ 'ru_title': 'Кол-во человек' })
    visit_length = Column(Integer, info={ 'ru_title': 'Продолжительность посещения, мин' })
    full_visit_length = Column(Integer, info={ 'ru_title': 'Полная продолжительность посещения, мин' })
    order_value = Column(Integer, info={ 'ru_title': 'Сумма заказа' })
    time_value = Column(Integer, info={ 'ru_title': 'Стоимость времени' })
    stuff_value = Column(Integer, info={ 'ru_title': 'Стоимость товаров' })
    payment_type = Column(String(20), info={ 'ru_title': 'Тип оплаты' })
    is_fixed = Column(String(20), info={ 'ru_title': 'Фикс' })
    client_name = Column(String(255), info={ 'ru_title': 'Клиент' })
    manager = Column(String(255), info={ 'ru_title': 'Менеджер' })
    tariff_time = Column(String(20), info={ 'ru_title': 'Тарификация по времени' })
    tariff_plan = Column(String(20), info={ 'ru_title': 'Тарифный план' })
    comment = Column(String(255), info={ 'ru_title': 'Комментарии' })
    history = Column(Text, info={ 'ru_title': 'История' })

    @classmethod
    def from_csv_row(cls, csv_row):
        params = {}
        for column in inspect(cls).columns:
            ru_title = column.info.get('ru_title', None)
            if not ru_title:
                continue

            value = csv_row[ru_title]
            if column.type.python_type == int:
                if value == '':
                    value = None
                else:
                    value = int(float(value))

            params[column.name] = value

        params['start_ts'] = cls._date_and_time_to_ts(csv_row['Дата начала'], csv_row['Время начала'])
        if csv_row['Дата конца']:
            params['end_ts'] = cls._date_and_time_to_ts(csv_row['Дата конца'], csv_row['Время конца'])

        return Order(**params)

    @classmethod
    def _date_and_time_to_ts(cls, date, time):
        return datetime.strptime(
            '{} {}'.format(date, time),
            "%d.%m.%Y %H:%M"
        ).timestamp()

    @property
    def start_dt(self):
        return datetime.fromtimestamp(self.start_ts, TZ)

    @property
    def end_dt(self):
        if not self.end_ts:
            return None
        return datetime.fromtimestamp(self.end_ts, TZ)

OrderHistoryItem = namedtuple('OrderHistoryItem', 'operation dt login')

User = namedtuple('User', 'id login name level')

def get_new_cookies(login, password):
    r = requests.post(
        DOMAIN,
        data={
            'login': login,
            'pass': password,
        }
    )
    r.raise_for_status()
    return r.cookies

def update_cookies_secret():
    auth = kocherga.secrets.json_secret('cafe_manager_credentials')

    cookies = get_new_cookies(auth['login'], auth['password'])

    kocherga.secrets.save_json_secret(cookies.get_dict(), 'cafe_manager_cookies')

def get_cookies():
    cookies_dict = kocherga.secrets.json_secret('cafe_manager_cookies')
    cookies = requests.cookies.RequestsCookieJar()
    cookies.update(cookies_dict)
    return cookies

def now_count():
    r = requests.get(DOMAIN, cookies=get_cookies(), timeout=10)
    r.encoding = 'utf-8'
    match = re.search(r'Посетителей сейчас в зале: <b>(\d+)</b>', r.text)
    if not match:
        raise Exception("Failed to parse cafe-manager data " + r.text)
    result = int(match.group(1))
    return result

def load_customers():
    url = DOMAIN + '/customer/export/'

    customers = []
    with requests.get(url, cookies=get_cookies(), stream=True) as r:
        r.raise_for_status()

        customer_reader = csv.DictReader(StringIO(r.content.decode('utf-8-sig')), delimiter=';')
        for row in customer_reader:
            customers.append(row)
    return customers

def load_orders():
    url = DOMAIN + '/stat/export/'

    orders = []
    with requests.get(url, cookies=get_cookies(), stream=True) as r:
        r.raise_for_status()

        csv_reader = csv.DictReader(StringIO(r.content.decode('utf-8-sig')), delimiter=';')
        for row in csv_reader:
            order = Order.from_csv_row(row)
            orders.append(order)
    return orders

def load_users():
    url = DOMAIN + '/config/'

    r = requests.get(url, cookies=get_cookies())

    html = r.content.decode('utf-8')

    fragments = re.findall(r"""<form method='post' action='/config/user/(\d+)/edit/#user'>(.*?)</form>""", html, flags=re.DOTALL)

    users = []
    for (user_id_str, form_html) in fragments:
        user_id = str(user_id_str)
        login_match = re.search(r"<input name='login' maxlength='\d+' value='(.*?)'", form_html)
        if login_match:
            login = login_match.group(1)
        else:
            if 'admin' not in form_html:
                raise Exception('bad html')
            login = 'admin'

        match = re.search(r"<input name='name'.*? value='(.*?)'", form_html)
        if not match:
            raise Exception('name input not found')
        name = match.group(1)

        if login == 'admin':
            level = 'Администратор'
        else:
            match = re.search(r"<option value=\d+ selected>(.*?)</option>", form_html)
            if not match:
                raise Exception('selected option not found')
            level = match.group(1)

        user = User(
            id=user_id,
            login=login,
            name=name,
            level=level,
        )
        users.append(user)

    return users

def load_order_history(order_id):
    url = f'{DOMAIN}/order/{order_id}'
    r = requests.get(url, cookies=get_cookies())

    match = re.search(r'История изменения заказа:\s*<div.*?>(.*?)</div>', r.content.decode('utf-8'), re.DOTALL)
    if not match:
        raise Exception('Failed to parse CM html, update the parsing code')

    users = load_users()
    username2login = { u.name: u.login for u in users }
    username2login['Нароттам Паршик'] = username2login['Нароттам Паршиков']

    history_html = match.group(1)
    items = []
    for item_html in re.findall(r'<li>(.*?)</li>', history_html):
        match = re.match(r'(.*?)\s*<i>(\d+.\d+.\d+ \d+:\d+) \((.*?)\)</i>', item_html)
        if not match:
            raise Exception(f'Failed to parse CM html item "{item_html}", update the parsing code')
        (operation, date_str, username) = match.groups()

        item = OrderHistoryItem(
            operation=operation,
            dt=datetime.strptime(date_str, '%d.%m.%Y %H:%M'),
            login=username2login[username],
        )
        items.append(item)

    return items


def add_customer(card_id, first_name, last_name, email):
    url = DOMAIN + '/customer/new/'
    params = {
        'card': card_id,
        'name': first_name,
        'family': last_name,
        'mail': email,
        'sex': 0,
        'subscr': 'true',
        'discount': '0%',
    }
    for empty_field in ('phone', 'phone2', 'birthday', 'adress', 'site', 'vk', 'fb', 'tw', 'instagram', 'skype', 'ref', 'ref2', 'note', 'Submit'):
        params[empty_field] = ''

    r = requests.post(
        url,
        params,
        cookies=get_cookies()
    )

    r.raise_for_status()

    r.encoding = 'utf-8'
    if 'Клиент успешно добавлен!' in r.text:
        return True

    if re.search(r'Карта с номером (\d+) используется другим клиентом', r.text):
        raise Exception('Card id is already taken')

    print(r.text)
    raise Exception('Expected a message about success in response, got something else')

class Importer(kocherga.importer.base.FullImporter):
    def init_db(self):
        Order.__table__.create(bind=kocherga.db.engine())

    def do_full_import(self, session):
        for order in load_orders():
            session.merge(order)
