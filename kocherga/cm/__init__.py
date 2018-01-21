import csv
import re
from io import StringIO
import requests

import kocherga.secrets

DOMAIN = kocherga.secrets.plain_secret('cafe_manager_server')

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

def load_customers():
    url = DOMAIN + '/customer/export/'

    with requests.get(url, cookies=get_cookies(), stream=True) as r:
        r.raise_for_status()

        customer_reader = csv.reader(StringIO(r.content.decode('utf-8')))
        for row in customer_reader:
            print(row)

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
