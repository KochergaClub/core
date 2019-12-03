import logging
logger = logging.getLogger(__name__)

import re
import requests

from .models import Customer, User
from .scraper import DOMAIN
from .auth import get_cookies
from .importer import load_users


def add_customer(card_id, first_name, last_name, email):
    url = DOMAIN + "/customer/new/"
    params = {
        "card": card_id,
        "name": first_name,
        "family": last_name,
        "mail": email,
        "sex": 0,
        "subscr": "true",
        "discount": "0%",
    }
    for empty_field in (
        "phone",
        "phone2",
        "birthday",
        "adress",
        "site",
        "vk",
        "fb",
        "tw",
        "instagram",
        "skype",
        "ref",
        "ref2",
        "note",
        "Submit",
    ):
        params[empty_field] = ""

    r = requests.post(url, params, cookies=get_cookies())

    r.raise_for_status()

    r.encoding = "utf-8"
    if "Клиент успешно добавлен!" in r.text:
        return True

    if re.search(r"Карта с номером (\d+) используется другим клиентом", r.text):
        raise Exception("Card id is already taken")

    print(r.text)
    raise Exception("Expected a message about success in response, got something else")


def add_manager(login: str, name: str, password: str, email: str) -> User:
    url = DOMAIN + "/config/user/new/"
    params = {
        'login': login,
        'name': name,
        'pass': password,
        'mail': email,
        'level': 2,
    }

    r = requests.post(url, params, cookies=get_cookies())
    r.raise_for_status()

    r.encoding = "utf-8"
    if "Данный Логин уже используется!" in r.text:
        raise Exception(f"User with login {login} already exists")

    if "Пользователь успешно добавлен!" not in r.text:
        raise Exception("Expected a message about success in response, got something else")

    all_users = load_users()
    user = next(u for u in all_users if u.login == login)
    return user


# Only for tests.
# CM users in production should be turned into "viewers" with new password instead.
def delete_manager(user: User) -> None:
    url = DOMAIN + f"/config/user/{user.id}/del/"
    r = requests.get(url, cookies=get_cookies())
    r.raise_for_status()


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
