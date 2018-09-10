import logging
logger = logging.getLogger(__name__)

from datetime import datetime
import re
import requests
from requests_toolbelt.multipart.encoder import MultipartEncoder

from kocherga.db import Session
from .model import Customer
from .scraper import DOMAIN, load_customer_from_html, get_cookies

def extend_subscription(card_id, period):
    customer_from_db = (
        Session()
        .query(Customer)
        .filter(Customer.card_id == card_id, Customer.is_active == True)
        .first()
    )
    customer_id = customer_from_db.customer_id
    logger.info(f"Customer ID for card ID {card_id}: {customer_id}")
    customer = load_customer_from_html(customer_id)  # we can't rely on DB cache here
    url = f"{DOMAIN}/customer/{customer_id}/edit/"

    subs_until = (
        max(customer.get("subscription", datetime.now().date()), datetime.now().date())
        + period
    )
    multipart_data = MultipartEncoder(
        fields={
            "card": customer["card"],
            "name": customer["name"],
            "family": customer["family"],
            "phone": customer.get("phone_number", None),
            "mail": customer.get("email", None),
            "subs": subs_until.strftime("%d.%m.%Y"),
            "subscr": "true" if customer["subscr"] else None,
        }
    )

    r = requests.post(
        url,
        cookies=get_cookies(),
        data=multipart_data,
        headers={"Content-Type": multipart_data.content_type},
    )
    r.raise_for_status()

    customer = load_customer_from_html(customer_id)  # we can't rely on DB cache here
    if customer["subscription"] != subs_until:
        raise Exception("Failed to extend a subscription, don't know why.")

    return subs_until


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
