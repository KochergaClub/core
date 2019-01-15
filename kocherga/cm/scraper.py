import requests
import re
from datetime import datetime
import json
import dbm
import os.path

from django.conf import settings

DOMAIN = settings.CAFE_MANAGER_SERVER

COOKIES_FILE = os.path.join(settings.DATA_DIR, 'cafe_manager_cookies.dbm')

def get_new_cookies(login, password):
    r = requests.post(DOMAIN, data={"login": login, "pass": password})
    r.raise_for_status()
    return r.cookies


def update_cookies():
    auth = settings.CAFE_MANAGER_CREDENTIALS

    cookies = get_new_cookies(auth["login"], auth["password"])

    with dbm.open(COOKIES_FILE, 'c') as db:
        db['cookies'] = json.dumps(cookies.get_dict())


def get_cookies():
    with dbm.open(COOKIES_FILE) as db:
        cookies = requests.cookies.RequestsCookieJar()
        cookies.update(json.loads(db['cookies']))

    return cookies


def load_customer_from_html(customer_id):
    url = f"{DOMAIN}/customer/{customer_id}/"
    r = requests.get(url, cookies=get_cookies(), timeout=10)
    r.raise_for_status()

    html = r.content.decode("utf-8")
    fragments = re.findall(
        r"""<div class="form-group">.*?</div>""", html, flags=re.DOTALL
    )

    label2key = {
        "Номер карты:": "card",
        "Имя:": "name",
        "Фамилия:": "family",
        "E-mail": "email",
        "Номер телефона:": "phone_number",
        "Скидка на время:": "discount",
        "Абонемент до:": "subscription",
        "Рассылки:": "subscr",
        "Заметка:": "comment",
    }
    result = {}
    for fragment in fragments:
        if ">Заметка:</label>" in fragment:
            continue
        match = re.search(
            r"<label.*?>(.*?)</label>\s*<span.*?>(.*?)</span>", fragment, flags=re.DOTALL
        )
        if not match:
            raise Exception("Unexpected form-group: " + fragment)
        (label, value) = match.groups()
        if label not in label2key:
            continue
        key = label2key[label]
        if key == "subscription":
            value = datetime.strptime(value, "%d.%m.%Y %H:%M").date()
        elif key == "subscr":
            if value == "согласен на получение":
                value = True
            else:
                value = False
        result[key] = value

    for required_field in "name", "card":
        if required_field not in result:
            raise Exception(f"{required_field} not found")

    return result
