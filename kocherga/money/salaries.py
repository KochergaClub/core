from collections import defaultdict
from datetime import datetime, timedelta, date
from dateutil.relativedelta import relativedelta
import math

import kocherga.watchmen.schedule
from kocherga.watchmen.models import ShiftType
import kocherga.staff.tools
from kocherga.cm.models import Order


def rate_by_shift(shift):
    if shift in (ShiftType.MORNING_V1, ShiftType.EVENING_V1):
        return 650
    elif shift == ShiftType.MORNING:
        return 500
    elif shift == ShiftType.MIDDAY:
        return 500
    elif shift == ShiftType.EVENING:
        return 600
    elif shift == ShiftType.NIGHT:
        return 600
    raise Exception("Unknown shift")


def short_name_stat_to_email_stat(stat):
    result = defaultdict(int)
    for k, v in stat.items():
        member = kocherga.staff.tools.find_member_by_short_name(k)
        if not member:
            raise Exception(f"Member {k} not found")
        result[member.user.email] = v
    return result


def cm_login_stat_to_email_stat(stat):
    result = defaultdict(int)
    for k, v in stat.items():
        member = kocherga.staff.tools.find_member_by_cm_login(k)
        if not member:
            raise Exception(f"Member {k} not found")
        result[member.user.email] = v
    return result


def shift_salaries(start_date, end_date):
    stat = defaultdict(int)

    d = start_date
    while d <= end_date:
        shifts = kocherga.watchmen.schedule.shifts_by_date(d)
        for (shift, watchman) in shifts.items():
            if watchman in ('Слава', 'Пион', 'Ночь', ''):
                continue
            rate = rate_by_shift(shift)
            stat[watchman] += rate
        d += timedelta(days=1)

    return short_name_stat_to_email_stat(stat)


def basic_salaries():
    result = defaultdict(int)
    return result  # no basic salaries

# def order_discount(order, customers_dict):
#     discount = 0
#
#     if order.card_id in customers_dict:
#         if customers_dict[order.card_id]['Скидка на время'] == '20%':
#             discount = 0.2
#
#     return discount

# def find_order_value(order, customers_dict):
#     discount = order_discount(order, customers_dict)
#     minutes = (order.end_dt - order.start_dt).seconds / 60
#
#     value = 0
#     while minutes > 0:
#         value += order.people * min(600, 2.5 * minutes * (1 - discount))
#         minutes -= min(minutes, 12 * 60)
#
#     return value


def period_orders(start_date, end_date):
    orders = Order.objects.filter(
        start_ts__gte=datetime.combine(start_date, datetime.min.time()).timestamp(),
        end_ts__lte=datetime.combine(end_date, datetime.max.time()).timestamp(),
    ).all()
    return orders


def commission_bonuses(start_date, end_date):
    orders = period_orders(start_date, end_date)

    commissions = defaultdict(float)
    for order in orders:
        if not order.end_dt:
            continue  # not over yet
        if not (start_date <= order.end_dt.date() <= end_date):
            continue

        open_manager = order.log_entries.first().login
        close_manager = order.log_entries.last().login
        value = order.order_value
        commissions[open_manager] += value * 0.01
        commissions[close_manager] += value * 0.01

    return cm_login_stat_to_email_stat(commissions)


class Salary:
    def __init__(self):
        self.shifts = 0
        self.commissions = 0
        self.basic = 0

    @classmethod
    def all_kinds(cls):
        return ('shifts', 'commissions', 'basic')

    def add(self, kind, value):
        value = int(value)
        if kind == 'shifts':
            self.shifts += value
        elif kind == 'commissions':
            self.commissions += value
        elif kind == 'basic':
            self.basic += value
        else:
            raise Exception(f"Unknown kind {kind}")

    @property
    def total(self):
        return self.shifts + self.commissions

    @property
    def for_elba(self):
        return math.ceil((self.shifts + self.commissions) / 0.87 / 115) * 115


class SalaryContainer:
    def __init__(self):
        self.salaries = {}

    def add(self, email, kind, value):
        if email not in self.salaries:
            self.salaries[email] = Salary()

        self.salaries[email].add(kind, value)

    def add_salary(self, email, salary):
        for kind in Salary.all_kinds():
            self.add(email, kind, getattr(salary, kind))

    def remove_salary(self, email):
        del self.salaries[email]

    def print_all(self):
        print(f'{"Имя":<14} {"2%":<8}{"Смены":<12}{"Всего":<8}')
        print('-' * 50)
        for email in sorted(self.salaries.keys()):
            member = kocherga.staff.tools.find_member_by_email(email)
            if not member:
                raise Exception(f'Person {email} not found')
            salary = self.salaries[email]
            print(f'{member.short_name:<14} {salary.shifts:<12}{salary.commissions:<8}{salary.total:<8}')


def calculate_salaries(start_date, end_date):
    container = SalaryContainer()

    add_basic_salaries = True
    add_bonus_salaries = True

    stat = shift_salaries(start_date, end_date)
    for k, v in stat.items():
        container.add(k, 'shifts', v)

    if add_basic_salaries:
        stat = basic_salaries()
        for k, v in stat.items():
            container.add(k, 'basic', v)

    if add_bonus_salaries:
        # temporary fix for one ahead-of-time salaries event
        bonuses_start_date = date(2018, 8, 4) if start_date == date(2018, 8, 6) else start_date

        stat = commission_bonuses(bonuses_start_date, end_date)
        for k, v in stat.items():
            container.add(k, 'commissions', v)

    return container


def dates_period(d=None):
    today = d or date.today()

    year = today.year
    month = today.month

    if 2 <= today.day <= 6:
        end_date = date(year, month, 5)
        month_ago = end_date - timedelta(days=30)
        start_date = date(month_ago.year, month_ago.month, 21)
    elif 17 <= today.day <= 21:
        start_date = date(year, month, 6)
        end_date = date(year, month, 20)
    else:
        raise Exception(f"Today is {today}, it's not time to pay any salaries")

    return (start_date, end_date)


def calculate_new_salaries(d=None):
    (start_date, end_date) = dates_period(d)

    salaries = calculate_salaries(start_date, end_date)

    def once_per_month(email):
        payment_type = kocherga.staff.tools.find_member_by_email(email).payment_type
        if payment_type == 'ELECTRONIC':
            return True
        if payment_type == 'CASH':
            return False
        raise Exception(f"Unknown payment type {payment_type} for email {email}")

    if end_date.day == 5:
        # need to add salaries for the previous period for those who get salaries on card once per month on 5th
        prev_start_date = end_date - relativedelta(months=1)
        prev_end_date = start_date - timedelta(days=1)

        prev_salaries = calculate_salaries(prev_start_date, prev_end_date)
        for email, salary in list(prev_salaries.salaries.items()):
            if once_per_month(email):
                salaries.add_salary(email, salary)
    else:
        for email, salary in list(salaries.salaries.items()):
            if once_per_month(email):
                salaries.remove_salary(email)

    return salaries
