import requests
import re
from datetime import datetime
import json
import dbm

from django.conf import settings

from .models import Customer

DOMAIN = settings.CAFE_MANAGER_SERVER


def get_new_cookies(login, password):
    r = requests.post(DOMAIN, data={"login": login, "pass": password})
    r.raise_for_status()
    return r.cookies


def update_cookies():
    auth = settings.CAFE_MANAGER_CREDENTIALS

    cookies = get_new_cookies(auth["login"], auth["password"])

    with dbm.open(settings.CAFE_MANAGER_COOKIES_FILE, 'c') as db:
        db['cookies'] = json.dumps(cookies.get_dict())


def get_cookies():
    with dbm.open(settings.CAFE_MANAGER_COOKIES_FILE) as db:
        cookies = requests.cookies.RequestsCookieJar()
        cookies.update(json.loads(db['cookies']))

    return cookies


def now_stats():
    try:
        r = requests.get(DOMAIN, cookies=get_cookies(), timeout=10)
    except ConnectionError as e:
        raise Exception("Failed to connect to Cafe Manager: " + repr(e))

    r.encoding = "utf-8"

    match = re.search(r"Посетителей сейчас в зале: <b>(\d+)</b>", r.text)
    if not match:
        raise Exception("Failed to parse cafe-manager data " + r.text)
    total = int(match.group(1))

    customer_ids = [int(value) for value in re.findall(r"<a\s+href='/customer/(\d+)/?'", r.text)]
    customers = Customer.objects.filter(customer_id__in=customer_ids).all()

    return {
        "total": total,
        "customers": customers,
    }


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
