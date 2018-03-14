import re
from io import StringIO

from collections import namedtuple, OrderedDict
from datetime import datetime
import csv
import requests

from typing import List

import kocherga.secrets

DOMAIN = kocherga.secrets.plain_secret('cafe_manager_server')

order_fields = OrderedDict([
    ('order_id',             { 'ru_title': 'Номер заказа', 'type': 'int', }),
    ('card_id',              { 'ru_title': 'Номер карты', 'type': 'int', }),
    ('start_date',           { 'ru_title': 'Дата начала', 'type': 'str', }),
    ('start_time',           { 'ru_title': 'Время начала', 'type': 'str', }),
    ('end_date',             { 'ru_title': 'Дата конца', 'type': 'str', }),
    ('end_time',             { 'ru_title': 'Время конца', 'type': 'str', }),
    ('people',               { 'ru_title': 'Кол-во человек', 'type': 'int', }),
    ('visit_length',         { 'ru_title': 'Продолжительность посещения, мин', 'type': 'int', }),
    ('full_visit_length',    { 'ru_title': 'Полная продолжительность посещения, мин', 'type': 'int', }),
    ('order_value',          { 'ru_title': 'Сумма заказа', 'type': 'int', }),
    ('time_value',           { 'ru_title': 'Стоимость времени', 'type': 'int', }),
    ('stuff_value',          { 'ru_title': 'Стоимость товаров', 'type': 'int', }),
    ('payment_type',         { 'ru_title': 'Тип оплаты', 'type': 'str', }),
    ('is_fixed',             { 'ru_title': 'Фикс', 'type': 'str', }),
    ('client_name',          { 'ru_title': 'Клиент', 'type': 'str', }),
    ('manager',              { 'ru_title': 'Менеджер', 'type': 'str', }),
    ('tariff_time',          { 'ru_title': 'Тарификация по времени', 'type': 'str', }),
    ('tariff_plan',          { 'ru_title': 'Тарифный план', 'type': 'str', }),
    ('comment',              { 'ru_title': 'Комментарии', 'type': 'str', }),
    ('history',              { 'ru_title': 'История', 'type': 'str', }),
    ('start_dt',             { 'type': 'datetime' }),
    ('end_dt',               { 'type': 'datetime' }),
])

def order_csv_fields() -> List[str]:
    return [f for f in order_fields.keys() if 'ru_title' in order_fields[f]]

class Order(namedtuple('Order', order_csv_fields())): # type: ignore

    def __new__(cls, csv_row):
        params = {}
        for key in order_fields:
            ru_title = order_fields[key].get('ru_title', None)
            if not ru_title:
                continue

            value = csv_row[ru_title]
            if order_fields[key]['type'] == 'int':
                if value == '':
                    value = None
                else:
                    value = int(float(value))

            params[key] = value

        return super(Order, cls).__new__(cls, **params)


    def _date_and_time_to_dt(self, date, time):
        return datetime.strptime(
            '{} {}'.format(date, time),
            "%d.%m.%Y %H:%M"
        )

    @property
    def start_dt(self):
        return self._date_and_time_to_dt(self.start_date, self.start_time)

    @property
    def end_dt(self):
        if not self.end_date:
            return None
        return self._date_and_time_to_dt(self.end_date, self.end_time)

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
            order = Order(row) # type: ignore
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
