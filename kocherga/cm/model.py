from datetime import datetime, date
import enum
from collections import namedtuple

from sqlalchemy import (
    inspect,
    Column,
    BigInteger,
    Integer,
    String,
    Text,
    DateTime,
    Date,
    Enum,
    Boolean,
    ForeignKey
)
from sqlalchemy.orm import relationship

import kocherga.db
from kocherga.config import TZ


def _date_and_time_to_ts(d, t):
    return datetime.strptime("{} {}".format(d, t), "%d.%m.%Y %H:%M").timestamp()


class SubscriptionOrder(kocherga.db.Base):
    __tablename__ = "cm_subscription_orders"

    card_id = Column(BigInteger, info={"ru_title": "Номер карты"}, primary_key=True)
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


class OrderLogEntry(kocherga.db.Base):
    __tablename__ = "cm_order_log"

    order_id = Column(Integer, ForeignKey("cm_orders.order_id"), primary_key=True)
    operation_id = Column(Integer, primary_key=True)
    operation = Column(String(1024))
    ts = Column(Integer)
    login = Column(String(80))

    order = relationship("Order", back_populates="log_entries")


class Order(kocherga.db.Base):
    __tablename__ = "cm_orders"

    order_id = Column(Integer, info={"ru_title": "Номер заказа"}, primary_key=True)
    card_id = Column(BigInteger, info={"ru_title": "Номер карты"})
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

    log_entries = relationship("OrderLogEntry", order_by=OrderLogEntry.operation_id, back_populates="order")

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

            if column.name == 'card_id' and value > 2147483648:
                value = 2147483648 # this bad order fails to import to the db: https://kocherga.cafe-manager.ru/order/29541/

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
    card_id = Column(BigInteger, info={"ru_title": "Номер Карты"})
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

    @property
    def privacy_mode(self):
        if self.comment and 'PRIVACY:PUBLIC' in self.comment:
            return 'public'
        return 'private'


User = namedtuple("User", "id login name level")
