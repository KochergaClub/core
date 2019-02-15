import logging
logger = logging.getLogger(__name__)

import csv
from io import StringIO
import requests
import re
from datetime import datetime

from django.db.models import Q

import kocherga.importer.base
import kocherga.email.lists

from .scraper import DOMAIN, get_cookies
from .models import Order, OrderLogEntry, Customer, SubscriptionOrder, User


def load_customers():
    url = DOMAIN + "/customer/export/"

    customers = []
    with requests.get(url, cookies=get_cookies(), stream=True) as r:
        r.raise_for_status()

        customer_reader = csv.DictReader(
            StringIO(r.content.decode("utf-8-sig")), delimiter=";"
        )
        for row in customer_reader:
            if row['Фамилия'] == '%3cscript3ealert(docum':
                continue
            customer = Customer.from_csv_row(row)
            customers.append(customer)
    return customers


def load_orders():
    url = DOMAIN + "/stat/export/"

    orders = []
    with requests.get(url, cookies=get_cookies(), stream=True) as r:
        r.raise_for_status()

        csv_reader = csv.DictReader(
            StringIO(r.content.decode("utf-8-sig")), delimiter=";"
        )
        for row in csv_reader:
            if row["История"].lower() == "продажа абонемента":
                order = SubscriptionOrder.from_csv_row(row)
            else:
                order = Order.from_csv_row(row)
            orders.append(order)
    return orders


def load_users():
    url = DOMAIN + "/config/"

    r = requests.get(url, cookies=get_cookies())

    html = r.content.decode("utf-8")

    fragments = re.findall(
        r"""<form method='post' action='/config/user/(\d+)/edit/#user'>(.*?)</form>""",
        html,
        flags=re.DOTALL,
    )

    users = []

    # needed for OrderLogEntries
    for i, name in enumerate(["Мальбург", "Андрей Ершов", "Макс", "Лев", "Женя", "Лена", "Маша", "Ринат", "Роман", "Филипп Б."]):
        deleted_user = User(id=-i, name=name, login=name, level="deleted")
        users.append(deleted_user)

    for (user_id_str, form_html) in fragments:
        user_id = str(user_id_str)
        login_match = re.search(
            r"<input name='login' maxlength='\d+' value='(.*?)'", form_html
        )
        if login_match:
            login = login_match.group(1)
        else:
            if "admin" not in form_html:
                raise Exception("bad html")
            login = "admin"

        match = re.search(r"<input name='name'.*? value='(.*?)'", form_html)
        if not match:
            raise Exception("name input not found")
        name = match.group(1)

        if login == "admin":
            level = "Администратор"
        else:
            match = re.search(r"<option value=\d+ selected>(.*?)</option>", form_html)
            if not match:
                raise Exception("selected option not found")
            level = match.group(1)

        user = User(id=user_id, login=login, name=name, level=level)
        users.append(user)

    return users


def load_order_log(order_id):
    url = f"{DOMAIN}/order/{order_id}"
    r = requests.get(url, cookies=get_cookies())

    html = r.content.decode("utf-8")

    match = re.search(
        r"История изменения заказа:\s*<div.*?>(.*?)</div>",
        html,
        re.DOTALL,
    )
    if not match:
        if re.search(r'Заказ с номером №\d+ не найден', html):
            # probably deleted, that's ok
            return []

        raise Exception("Failed to parse CM html, update the parsing code")

    users = load_users()

    username2login = {}
    for u in users:
        username2login[u.name] = u.login
        if len(u.name) > 15:
            username2login[u.name[:15]] = u.login
    username2login["Анастасия Шафор"] = "AHACTAC"


    log_html = match.group(1)
    entries = []
    for operation_id, entry_html in enumerate(
        reversed(re.findall(r"<li>(.*?)</li>", log_html))
    ):
        match = re.match(r"(.*?)\s*<i>(\d+.\d+.\d+ \d+:\d+) \((.*?)\)</i>", entry_html)
        if not match:
            raise Exception(
                f'Failed to parse CM html item "{entry_html}", update the parsing code'
            )
        (operation, date_str, username) = match.groups()

        if username in username2login:
            login = username2login[username]
        else:
            raise Exception(f"Login not found for username {username}")
        entry = OrderLogEntry(
            order_id=order_id,
            operation_id=operation_id,
            operation=operation,
            ts=datetime.strptime(date_str, "%d.%m.%Y %H:%M").timestamp(),
            login=login,
        )
        entries.append(entry)

    return entries


class Importer(kocherga.importer.base.FullImporter):

    def __init__(self, log_portion_size=100):
        self.log_portion_size = log_portion_size

    def import_order_log(self, order):
        logger.info(
            f"Updating log for {order.order_id}; last ts = {order.log_imported_ts}"
        )
        log_entries = load_order_log(order.order_id)
        OrderLogEntry.objects.filter(order_id=order.order_id).delete()
        for entry in log_entries:
            entry.save()
        order.log_imported_ts = datetime.now().timestamp()
        order.save()

    def do_full_import(self, session):
        logger.info("Loading orders")
        orders = load_orders()

        logger.info(f"Imported {len(orders)} orders")

        logger.info("Importing order logs")

        for (q, note) in (
                (Q(log_imported_ts__lt=datetime.now().timestamp() - 86400), 'stale'),
                (Q(log_imported_ts__isnull=True), 'never imported'),
        ):
            logger.info(f"Importing {note} order logs")
            query = (
                Order.objects.filter(q).order_by('-order_id')
            )
            for order in query[:self.log_portion_size]:
                self.import_order_log(order)

        logger.info("Loading customers")
        customers = load_customers()

        logger.info("Uploading customers to Mailchimp")
        kocherga.email.lists.populate_main_list([
            kocherga.email.lists.User(
                email=c.email,
                first_name=c.first_name,
                last_name=c.last_name,
                card_id=c.card_id,
            )
            for c in customers
            if c.email
        ])

        logger.info(f"Imported {len(customers)} customers")
