#!/usr/bin/env python3
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

from collections import defaultdict, namedtuple
from datetime import datetime, timedelta, date
import logging
import copy

import fire

from kocherga.db import Session
from kocherga.watchmen import load_schedule, Shift
import kocherga.team
import kocherga.slack
import kocherga.cm

def rate_by_shift(shift):
    if shift in (Shift.MORNING_V1, Shift.EVENING_V1):
        return 650
    elif shift == Shift.MORNING:
        return 500
    elif shift == Shift.MIDDAY:
        return 500
    elif shift == Shift.EVENING:
        return 600
    elif shift == Shift.NIGHT:
        return 600
    raise Exception("Unknown shift")

def short_name_stat_to_email_stat(stat):
    result = defaultdict(int)
    for k, v in stat.items():
        member = kocherga.team.find_member_by_short_name(k)
        if not member:
            raise Exception(f"Member {k} not found")
        result[member.email] = v
    return result

def cm_login_stat_to_email_stat(stat):
    result = defaultdict(int)
    for k, v in stat.items():
        member = kocherga.team.find_member_by_cm_login(k)
        if not member:
            raise Exception(f"Member {k} not found")
        result[member.email] = v
    return result

def shift_salaries(start_date, end_date):
    stat = defaultdict(int)

    schedule = load_schedule()

    d = start_date
    while d <= end_date:
        shifts = schedule.shifts_by_date(d)
        for (shift, watchman) in shifts.items():
            if watchman in ('Слава', 'Пион', 'Ночь', ''):
                continue
            rate = rate_by_shift(shift)
            stat[watchman] += rate
        d += timedelta(days=1)

    return short_name_stat_to_email_stat(stat)

def basic_salaries():
    result = defaultdict(int)
    result['Таня'] = 15000
    return short_name_stat_to_email_stat(result)

def order_discount(order, customers_dict):
    discount = 0

    if order.card_id in customers_dict:
        if customers_dict[order.card_id]['Скидка на время'] == '20%':
            discount = 0.2

    return discount

def find_order_value(order, customers_dict):
    discount = order_discount(order, customers_dict)
    minutes = (order.end_dt - order.start_dt).seconds / 60

    value = 0
    while minutes > 0:
        value += order.people * min(600, 2.5 * minutes * (1 - discount))
        minutes -= min(minutes, 12 * 60)

    return value

def period_orders(start_date, end_date):
    orders = Session() \
        .query(kocherga.cm.Order) \
        .filter(kocherga.cm.Order.start_ts >= datetime.combine(start_date, datetime.min.time()).timestamp()) \
        .filter(kocherga.cm.Order.end_ts <= datetime.combine(end_date, datetime.max.time()).timestamp()) \
        .all()
    return orders

def commission_bonuses(start_date, end_date):
    orders = period_orders(start_date, end_date)

    commissions = defaultdict(float)
    for order in orders:
        if not order.end_dt:
            continue # not over yet
        if not (start_date <= order.end_dt.date() <= end_date):
            continue

        open_manager = order.log_entries[0].login
        close_manager = order.log_entries[-1].login
        value = order.order_value
        commissions[open_manager] += value * 0.01
        commissions[close_manager] += value * 0.01

    return cm_login_stat_to_email_stat(commissions)


def night_bonuses(start_date, end_date):
    orders = period_orders(start_date, end_date)

    customers = Session().query(kocherga.cm.Customer).all()
    customers_dict = { int(c['Номер Карты']): c for c in customers }

    schedule = load_schedule()

    stat = defaultdict(int)

    def find_counterfactual_value(order):
        # mode = nightless; TODO - generalize to other modes, move to kocherga.cm for analytics

        order = copy.copy(order)

        if order.start_dt.hour < 9:
            order = order.start_dt.replace(hour=9, minute=0).timestamp()
        if order.end_dt.hour < 9 or order.start_dt.date() != order.end_dt.date():
            if not (order.end_dt.hour == 0 and order.end_dt.minute < 10):
                # Probably just an overtime and we'd get this income anyway
                # (this check for the sake of clearer calculations, not for the sake of saving money on bonuses)
                order.end_ts = order.end_dt.replace(hour=0, minute=0).timestamp()

        return find_order_value(order, customers_dict)

    def find_night_watchman(order):
        night_dt = order.end_dt.replace(hour=0, minute=10)
        if not (order.start_dt < night_dt < order.end_dt):
            raise Exception(f'{order.order_id}, {order.start_dt}, {night_dt}, {order.end_dt}')
        watchman = schedule.watchman_by_dt(night_dt)

        if watchman == 'Ночь':
            # extra shift, we'll have to check CM order history
            history_items = kocherga.cm.load_order_history(order.order_id)

            close_item = next(item for item in history_items if item.operation == 'Заказ закрыт')
            cm_login = close_item.login
            team_member = next(m for m in kocherga.team.members() if m.cm_login == cm_login)

            watchman = team_member.short_name

        return watchman

    for order in orders:
        if not order.end_dt:
            continue # not over yet
        if order.time_value == 0:
            continue # free
        if not (start_date <= order.end_dt.date() <= end_date):
            continue
        if order.is_fixed == 'да':
            continue # TODO - check if it could result in some bonuses anyway

        if order.start_dt.date() == order.end_dt.date() and order.start_dt.hour >= 9:
            continue # not relevant

        value = find_order_value(order, customers_dict)
        if abs(order.time_value - value) > 10 * order.people:
            logging.info(f'order {order.order_id} is not ok, got {value} instead of {order.time_value}')
            continue

        nightless_value = find_counterfactual_value(order)
        if value == nightless_value:
            continue

        watchman = find_night_watchman(order)
        logging.info(f'{value} -> {nightless_value} | https://kocherga.cafe-manager.ru/order/{order.order_id} | {watchman}')
        delta = value - nightless_value

        stat[watchman] += int(delta * 0.5)

    logging.info(stat)
    return short_name_stat_to_email_stat(stat)

def add_dict(d1, d2):
    result = defaultdict(float)
    for (k, v) in d1.items():
        result[k] += v
    for (k, v) in d2.items():
        result[k] += v
    return result

class Salary:
    def __init__(self):
        self.shifts = 0
        self.commissions = 0
        self.basic = 0

    def set(self, kind, value):
        value = int(value)
        if kind == 'shifts':
            self.shifts = value
        elif kind == 'commissions':
            self.commissions = value
        elif kind == 'basic':
            self.basic = value
        else:
            raise Exception(f"Unknown kind {kind}")

    @property
    def total(self):
        return self.shifts + self.commissions + self.basic

class SalaryContainer:
    def __init__(self):
        self.salaries = {}

    def add_salary(self, email, kind, value):
        if email not in self.salaries:
            self.salaries[email] = Salary()

        self.salaries[email].set(kind, value)

    def print_all(self):
        print(f'{"Имя":<14} {"База":<8}{"2%":<8}{"Смены":<12}{"Всего":<8}')
        print('-' * 50)
        for email in sorted(self.salaries.keys()):
            member = kocherga.team.find_member_by_email(email)
            if not member:
                raise Exception(f'Person {email} not found')
            # slack_user = kocherga.slack.client().api_call('users.info', user=member.slack_id)
            # display_name = slack_user['user']['profile']['display_name']
            salary = self.salaries[email]
            print(f'{member.short_name:<14} {salary.basic:<8}{salary.commissions:<8}{salary.shifts:<12}{salary.total:<8}')

def main(month, mode):
    year = 2018

    add_basic_salaries = True
    add_bonus_salaries = True
    container = SalaryContainer()

    if mode == 5:
        end_date = date(year, month, 5)
        month_ago = end_date - timedelta(days=30)
        start_date = date(month_ago.year, month_ago.month, 21)
    elif mode == 20:
        start_date = date(year, month, 6)
        end_date = date(year, month, 20)
    elif mode == 'elba':
        start_date = date(year, month, 6)
        end_date = date(year, month + 1, 5)
        add_basic_salaries = False
        add_bonus_salaries = False
    elif mode == 'tmp':
        start_date = date(year, 2, 16)
        end_date = date(year, 2, 20)
        add_basic_salaries = False
        logging.basicConfig(level='INFO')
    else:
        raise Exception("Unknown mode, expected 5 or 20")

    stat = shift_salaries(start_date, end_date)
    for k, v in stat.items():
        container.add_salary(k, 'shifts', v)

    if add_basic_salaries:
        stat = basic_salaries()
        for k, v in stat.items():
            container.add_salary(k, 'basic', v)

    if add_bonus_salaries:
        # stat = night_bonuses(start_date, end_date)
        stat = commission_bonuses(start_date, end_date)
        for k, v in stat.items():
            container.add_salary(k, 'commissions', v)

    container.print_all()

if __name__ == '__main__':
    fire.Fire(main)
