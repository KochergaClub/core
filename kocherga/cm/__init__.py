import logging

logger = logging.getLogger(__name__)

import re
from io import StringIO

import enum
from collections import namedtuple, OrderedDict
from datetime import datetime, date
import csv
import requests
from requests_toolbelt.multipart.encoder import MultipartEncoder

from sqlalchemy import (
    inspect,
    Column,
    Integer,
    String,
    Text,
    DateTime,
    Date,
    Enum,
    Boolean,
    or_,
)

from typing import List

from kocherga.db import Session
from kocherga.config import TZ
import kocherga.secrets
import kocherga.importer.base

DOMAIN = kocherga.secrets.plain_secret("cafe_manager_server")


def _date_and_time_to_ts(date, time):
    return datetime.strptime("{} {}".format(date, time), "%d.%m.%Y %H:%M").timestamp()


class SubscriptionOrder(kocherga.db.Base):
    __tablename__ = "cm_subscription_orders"

    card_id = Column(Integer, info={"ru_title": "Номер карты"}, primary_key=True)
    ts = Column(Integer, primary_key=True)
    order_value = Column(Integer, info={"ru_title": "Сумма заказа"})
    payment_type = Column(String(20), info={"ru_title": "Тип оплаты"})
    client_name = Column(String(255), info={"ru_title": "Клиент"})
    manager = Column(String(255), info={"ru_title": "Менеджер"})

    @classmethod
    def from_csv_row(cls, csv_row):
        params = {}
        for column in inspect(cls).columns:
            ru_title = column.info.get("ru_title", None)
            if not ru_title:
                continue

            value = csv_row[ru_title]
            if column.type.python_type == int:
                if value == "":
                    value = None
                else:
                    value = int(float(value))

            params[column.name] = value

        params["ts"] = _date_and_time_to_ts(
            csv_row["Дата начала"], csv_row["Время начала"]
        )

        return cls(**params)


class Order(kocherga.db.Base):
    __tablename__ = "cm_orders"

    order_id = Column(Integer, info={"ru_title": "Номер заказа"}, primary_key=True)
    card_id = Column(Integer, info={"ru_title": "Номер карты"})
    start_ts = Column(Integer)
    end_ts = Column(Integer)
    imported_ts = Column(Integer)
    log_imported_ts = Column(Integer)
    people = Column(Integer, info={"ru_title": "Кол-во человек"})
    visit_length = Column(
        Integer, info={"ru_title": "Продолжительность посещения, мин"}
    )
    full_visit_length = Column(
        Integer, info={"ru_title": "Полная продолжительность посещения, мин"}
    )
    order_value = Column(Integer, info={"ru_title": "Сумма заказа"})
    time_value = Column(Integer, info={"ru_title": "Стоимость времени"})
    stuff_value = Column(Integer, info={"ru_title": "Стоимость товаров"})
    payment_type = Column(String(20), info={"ru_title": "Тип оплаты"})
    is_fixed = Column(String(20), info={"ru_title": "Фикс"})
    client_name = Column(String(255), info={"ru_title": "Клиент"})
    manager = Column(String(255), info={"ru_title": "Менеджер"})
    tariff_time = Column(String(20), info={"ru_title": "Тарификация по времени"})
    tariff_plan = Column(String(40), info={"ru_title": "Тарифный план"})
    comment = Column(String(1024), info={"ru_title": "Комментарии"})
    history = Column(Text, info={"ru_title": "История"})

    @classmethod
    def from_csv_row(cls, csv_row):
        params = {}
        for column in inspect(cls).columns:
            ru_title = column.info.get("ru_title", None)
            if not ru_title:
                continue

            value = csv_row[ru_title]
            if column.type.python_type == int:
                if value == "":
                    value = None
                else:
                    value = int(float(value))

            params[column.name] = value

        params["start_ts"] = _date_and_time_to_ts(
            csv_row["Дата начала"], csv_row["Время начала"]
        )
        if csv_row["Дата конца"]:
            params["end_ts"] = _date_and_time_to_ts(
                csv_row["Дата конца"], csv_row["Время конца"]
            )

        if not params["order_id"]:
            raise Exception(
                f"Can't accept an order without a primary key; row: {str(csv_row)}"
            )

        params["imported_ts"] = datetime.now().timestamp()

        return cls(**params)

    @property
    def start_dt(self):
        return datetime.fromtimestamp(self.start_ts, TZ)

    @property
    def end_dt(self):
        if not self.end_ts:
            return None
        return datetime.fromtimestamp(self.end_ts, TZ)


class Gender(enum.Enum):
    unknown = 0
    male = 1
    female = 2


class Customer(kocherga.db.Base):
    __tablename__ = "cm_customers"

    # important
    customer_id = Column(Integer, info={"ru_title": "id"}, primary_key=True)
    card_id = Column(Integer, info={"ru_title": "Номер Карты"})
    first_name = Column(String(100), info={"ru_title": "Имя"})
    last_name = Column(String(100), info={"ru_title": "Фамилия"})
    gender = Column(Enum(Gender), info={"ru_title": "Пол"})
    email = Column(String(255), info={"ru_title": "E-mail"})
    time_discount = Column(Integer, info={"ru_title": "Скидка на время"})
    is_active = Column(Boolean, info={"ru_title": "Статус"})  # "Активный" / "В архиве"

    # can be restored from subscriptions table (when we import it)
    subscription_until = Column(Date, info={"ru_title": "Абонемент"})

    # maybe important
    comment = Column(Text, info={"ru_title": "Комментарий"})

    # mostly unused
    phone_number = Column(String(40), info={"ru_title": "Телефон"})
    phone_number2 = Column(String(40), info={"ru_title": "Телефон 2"})
    vk_link = Column(String(1024), info={"ru_title": "Вконтакте"})
    fb_link = Column(String(1024), info={"ru_title": "FaceBook"})
    twitter_link = Column(String(1024), info={"ru_title": "Twitter"})
    instagram_link = Column(String(1024), info={"ru_title": "Instagram"})
    skype_link = Column(String(1024), info={"ru_title": "Skype"})
    website_link = Column(String(1024), info={"ru_title": "Сайт"})
    birthday = Column(Date, info={"ru_title": "Дата рождения"})
    address = Column(String(1024), info={"ru_title": "Адрес"})

    ref = Column(String(1024), info={"ru_title": "Ref"})
    ref2 = Column(String(1024), info={"ru_title": "Ref 2"})
    mailing_list = Column(
        Boolean, info={"ru_title": "Рассылка"}
    )  # useless - filled randomly

    goods_discount = Column(Integer, info={"ru_title": "Скидка на товары"})

    # can probably be restored from other data
    activity_started = Column(DateTime, info={"ru_title": "Начало активности"})
    activity_ended = Column(DateTime, info={"ru_title": "Конец активности"})
    last_visit = Column(Date, info={"ru_title": "Последний визит"})
    total_spent = Column(Integer, info={"ru_title": "Всего денег"})

    @classmethod
    def from_csv_row(cls, csv_row):
        params = {}
        for column in inspect(cls).columns:
            ru_title = column.info.get("ru_title", None)
            if not ru_title:
                continue

            value = csv_row[ru_title]
            if value == "":
                value = None
            else:
                if column.type.python_type == str:
                    pass
                elif column.type.python_type == int:
                    if value.endswith("%"):
                        value = value[:-1]
                    value = int(float(value))
                elif column.type.python_type == date:
                    value = datetime.strptime(value, "%d.%m.%Y").date()
                elif column.type.python_type == datetime:
                    value = datetime.strptime(value, "%d.%m.%Y %H:%M")
                elif column.type.python_type == bool:
                    if value in ("Да", "true", "Активный"):
                        value = True
                    elif value in ("Нет", "false", "В Архиве"):
                        value = False
                    else:
                        raise Exception(f"Unparsable boolean value {value}")
                elif column.type.python_type == Gender:
                    if value == "жен.":
                        value = Gender.female
                    elif value == "муж.":
                        value = Gender.male
                    else:
                        raise Exception(f"Unparsable gender value {value}")
                else:
                    raise Exception(
                        f"Don't know how to to parse value to {column.type.python_type}"
                    )

            params[column.name] = value

        return Customer(**params)


class OrderLogEntry(kocherga.db.Base):
    __tablename__ = "cm_order_log"

    order_id = Column(Integer, primary_key=True)
    operation_id = Column(Integer, primary_key=True)
    operation = Column(String(1024))
    ts = Column(Integer)
    login = Column(String(80))


User = namedtuple("User", "id login name level")


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


def now_count():
    r = requests.get(DOMAIN, cookies=get_cookies(), timeout=10)
    r.encoding = "utf-8"
    match = re.search(r"Посетителей сейчас в зале: <b>(\d+)</b>", r.text)
    if not match:
        raise Exception("Failed to parse cafe-manager data " + r.text)
    result = int(match.group(1))
    return result


def load_customers():
    url = DOMAIN + "/customer/export/"

    customers = []
    with requests.get(url, cookies=get_cookies(), stream=True) as r:
        r.raise_for_status()

        customer_reader = csv.DictReader(
            StringIO(r.content.decode("utf-8-sig")), delimiter=";"
        )
        for row in customer_reader:
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
    for i, name in enumerate(["Мальбург", "Андрей Ершов", "Макс", "Лев"]):
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

    match = re.search(
        r"История изменения заказа:\s*<div.*?>(.*?)</div>",
        r.content.decode("utf-8"),
        re.DOTALL,
    )
    if not match:
        raise Exception("Failed to parse CM html, update the parsing code")

    users = load_users()
    username2login = {u.name: u.login for u in users}

    username_fixes = {"Нароттам Паршик": "Нароттам Паршиков"}

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
        elif username in username_fixes:
            login = username2login[username_fixes[username]]
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

    for required_field in "name", "family", "card":
        if required_field not in result:
            raise Exception(f"{required_field} not found")

    return result


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


def orders_at_dt(dt):
    orders = (
        kocherga.db.Session()
        .query(Order)
        .filter(Order.start_ts <= dt.timestamp())
        .filter(or_(Order.end_ts >= dt.timestamp(), Order.end_ts is None))
        .all()
    )

    return orders


class Importer(kocherga.importer.base.FullImporter):

    def init_db(self):
        Order.__table__.create(bind=kocherga.db.engine())

    def import_order_log(self, session, order):
        logger.info(
            f"Updating log for {order.order_id}; last ts = {order.log_imported_ts}"
        )
        log_entries = load_order_log(order.order_id)
        session.query(OrderLogEntry).filter(
            OrderLogEntry.order_id == order.order_id
        ).delete()
        for entry in log_entries:
            session.add(entry)
        order.log_imported_ts = datetime.now().timestamp()

    def do_full_import(self, session):
        logger.info("Loading orders")
        orders = load_orders()
        logger.info("Merging orders")
        for order in orders:
            session.merge(order)
            # self.import_order_log(session, order)
            # logger.info(f'Imported {order.order_id}')

        logger.info(f"Imported {len(orders)} orders")

        query = (
            session.query(Order)
            .filter(
                or_(
                    Order.log_imported_ts < datetime.now().timestamp() - 86400,
                    Order.log_imported_ts == None,
                )
            )
            .order_by(Order.order_id.desc())
        )
        for order in query.limit(100).all():
            self.import_order_log(session, order)

        logger.info("Loading customers")
        customers = load_customers()
        logger.info("Merging customers")
        for customer in customers:
            session.merge(customer)
        logger.info(f"Imported {len(customers)} customers")
