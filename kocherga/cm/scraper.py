import requests
import re
from datetime import datetime

import kocherga.secrets
from kocherga.db import Session

from .model import Customer

DOMAIN = kocherga.secrets.plain_secret("cafe_manager_server")


def get_new_cookies(login, password):
    r = requests.post(DOMAIN, data={"login": login, "pass": password})
    r.raise_for_status()
    return r.cookies


def update_cookies_secret():
    auth = kocherga.secrets.json_secret("cafe_manager_credentials")

    cookies = get_new_cookies(auth["login"], auth["password"])

    kocherga.secrets.save_json_secret(cookies.get_dict(), "cafe_manager_cookies")


def get_cookies():
    cookies_dict = kocherga.secrets.json_secret("cafe_manager_cookies")
    cookies = requests.cookies.RequestsCookieJar()
    cookies.update(cookies_dict)
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
    customers = Session().query(Customer).filter(Customer.customer_id.in_(customer_ids)).all()

    return {
        "total": total,
        "customers": [
            {
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "privacy_mode": customer.privacy_mode,
            }
            for customer in customers
        ]
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
            "<label.*?>(.*?)</label>\s*<span.*?>(.*?)</span>", fragment, flags=re.DOTALL
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
