from collections import defaultdict
from datetime import datetime, timedelta, date
from dateutil.relativedelta import relativedelta
import math

import kocherga.watchmen.schedule
from kocherga.watchmen.models import ShiftType
import kocherga.staff.tools
from kocherga.staff.models import Member
from kocherga.cm.models import Order
from kocherga.dateutils import TZ, inflected_month
from kocherga.money.cashier.models import Payment


def rate_by_shift(shift_type: ShiftType) -> int:
    if shift_type in (ShiftType.MORNING_V1, ShiftType.EVENING_V1):
        return 650
    elif shift_type == ShiftType.MORNING:
        return 500
    elif shift_type == ShiftType.MIDDAY:
        return 500
    elif shift_type == ShiftType.EVENING:
        return 600
    elif shift_type == ShiftType.NIGHT:
        return 600
    raise Exception(f"Unknown shift type {shift_type}")


def cm_login_stat_to_id_stat(stat):
    result = defaultdict(int)
    for k, v in stat.items():
        if k == 'admin':
            continue
        try:
            member = Member.objects.get(cm_login=k)
        except Member.DoesNotExist:
            raise Exception(f"Couldn't find member by cm login {k}")

        result[member.id] = v
    return result


def shift_salaries(start_date, end_date):
    stat = defaultdict(int)

    d = start_date
    while d <= end_date:
        shifts = kocherga.watchmen.schedule.shifts_by_date(d)
        for (shift_type, shift) in shifts.items():
            if not shift.watchman:
                continue
            rate = rate_by_shift(shift_type)
            stat[shift.watchman.member.id] += rate
        d += timedelta(days=1)

    return stat


def basic_salaries():
    result = defaultdict(int)
    return result  # no basic salaries


def period_orders(start_date, end_date):
    orders = list(Order.objects.filter(
        start_ts__gte=datetime.combine(start_date, datetime.min.time(), tzinfo=TZ).timestamp(),
        end_ts__lte=datetime.combine(end_date, datetime.max.time(), tzinfo=TZ).timestamp(),
    ).all())
    return orders


def commission_bonuses(start_date, end_date):
    orders = period_orders(start_date, end_date)

    if not orders or abs((end_date - orders[-1].end_dt).seconds) > 86400:
        raise Exception("Something is wrong with orders, check that cm importer is not broken")

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

    return cm_login_stat_to_id_stat(commissions)


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
    def __init__(self, start_date, end_date):
        self.salaries = {}
        self.start_date = start_date
        self.end_date = end_date

    def add(self, member_id, kind, value):
        if member_id not in self.salaries:
            self.salaries[member_id] = Salary()

        self.salaries[member_id].add(kind, value)

    def add_salary(self, member_id, salary):
        for kind in Salary.all_kinds():
            self.add(member_id, kind, getattr(salary, kind))

    def remove_salary(self, member_id):
        del self.salaries[member_id]

    def print_all(self):
        print(f'{"Имя":<14} {"2%":<8}{"Смены":<12}{"Всего":<8}')
        print('-' * 50)
        for member_id in sorted(self.salaries.keys()):
            member = Member.objects.get(pk=member_id)
            salary = self.salaries[member.user.email]
            print(f'{member.short_name:<14} {salary.shifts:<12}{salary.commissions:<8}{salary.total:<8}')


def calculate_salaries(start_date, end_date):
    container = SalaryContainer(start_date, end_date)

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
        stat = commission_bonuses(start_date, end_date)
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

    def once_per_month(member_id):
        member = Member.objects.get(pk=member_id)
        payment_type = member.payment_type
        if payment_type == 'ELECTRONIC':
            return True
        if payment_type == 'CASH':
            return False
        raise Exception(f"Unknown payment type {payment_type} for email {member.user.email}")

    if end_date.day == 5:
        # need to add salaries for the previous period for those who get salaries on card once per month on 5th
        prev_start_date = end_date - relativedelta(months=1)
        prev_end_date = start_date - timedelta(days=1)

        prev_salaries = calculate_salaries(prev_start_date, prev_end_date)
        for member_id, salary in list(prev_salaries.salaries.items()):
            if once_per_month(member_id):
                salaries.add_salary(member_id, salary)
    else:
        for member_id, salary in list(salaries.salaries.items()):
            if once_per_month(member_id):
                salaries.remove_salary(member_id)

    return salaries


def salaries_to_payments(salaries: SalaryContainer):
    start_date = salaries.start_date
    end_date = salaries.end_date
    comment_prefix = "Зарплата за "
    if start_date.month == end_date.month:
        comment_prefix += f"{start_date.day}–{end_date.day} {inflected_month(start_date)}"
    else:
        comment_prefix += f"{start_date.day} {inflected_month(start_date)}–{end_date.day} {inflected_month(end_date)}"

    for member_id, salary in salaries.salaries.items():
        if salary.total == 0:
            continue
        member = Member.objects.get(pk=member_id)
        if member.payment_type != 'CASH':
            continue

        comment = f"{comment_prefix}. Смены: {salary.shifts}, бонус: {salary.commissions}"
        if member.watchman and member.watchman.grade:
            comment += f". Грейд: {member.watchman.grade.code}"

        Payment.objects.create(
            whom=member.user,
            amount=salary.total,
            comment=comment,
        )
