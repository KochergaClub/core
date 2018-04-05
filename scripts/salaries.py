#!/usr/bin/env python3
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

from collections import Counter
from datetime import datetime, timedelta, date
import logging
import copy

import fire

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

def shift_salaries(start_date, end_date):
    stat = Counter()

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

    return stat

def basic_salaries():
    return Counter(**{
        'Таня': 15000,
    })

def bonuses(start_date, end_date):
    orders = kocherga.cm.load_orders()
    customers = kocherga.cm.load_customers()
    customers_dict = { int(c['Номер Карты']): c for c in customers }

    schedule = load_schedule()

    stat = Counter()

    def order_discount(order):
        discount = 0

        if order.card_id in customers_dict:
            if customers_dict[order.card_id]['Скидка на время'] == '20%':
                discount = 0.2

        return discount

    def find_value(order):
        discount = order_discount(order)
        minutes = (order.end_dt - order.start_dt).seconds / 60

        value = 0
        while minutes > 0:
            value += order.people * min(600, 2.5 * minutes * (1 - discount))
            minutes -= min(minutes, 12 * 60)

        return value

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

        return find_value(order)

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

        value = find_value(order)
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
    return stat

def main(month, mode):
    year = 2018

    add_basic_salaries = True
    add_bonus_salaries = False

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
    if add_basic_salaries:
        stat += basic_salaries()
    if add_bonus_salaries:
        stat += bonuses(start_date, end_date)

    for person in sorted(stat.keys()):
        member = kocherga.team.find_member_by_short_name(person)
        # slack_user = kocherga.slack.client().api_call('users.info', user=member.slack_id)
        # display_name = slack_user['user']['profile']['display_name']
        print(f'{member.short_name}: {stat[person]}')

if __name__ == '__main__':
    fire.Fire(main)
