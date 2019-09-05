from kocherga.ludwig.bot import bot

import kocherga.money.cashier.models
import kocherga.money.salaries
from kocherga.money.salaries import SalaryContainer
import kocherga.staff.tools
from kocherga.staff.models import Member
from kocherga.dateutils import inflected_month


def cash_response():
    cash = kocherga.money.cashier.models.current_cash()
    return f"В кассе {cash} руб."


@bot.listen_to(r"сколько\s+(сейчас\s+)?денег\s+в\s+кассе")
def react_current_cash(message, query):
    message.reply(cash_response())


@bot.command("/cash")
def command_current_cash(payload):
    return cash_response()


def is_slava(message):
    user_id = message.body["user"]
    response = message.sc.api_call("users.info", user=user_id)
    if not response["ok"]:
        raise Exception("Couldn't load user info")

    email = response["user"]["profile"]["email"]
    return email == "slava@kocherga-club.ru"


def salaries_message(salaries: SalaryContainer, with_elba_values=False):
    attachments = []
    for member_id, salary in salaries.salaries.items():
        if salary.total == 0:
            continue

        member = Member.objects.get(pk=member_id)

        payment_emoji = ''
        if member.payment_type == 'CASH':
            payment_emoji = ':dollar:'
        elif member.payment_type == 'ELECTRONIC':
            payment_emoji = ':credit_card:'

        member_attachment = {
            "text": f"{member.short_name} <@{member.slack_id}>: {payment_emoji}*{salary.total}* руб.",
            "fields": [
                {
                    "title": "Смены",
                    "value": f"{salary.shifts} руб.",
                    "short": True,
                },
                {
                    "title": "2% бонус",
                    "value": f"{salary.commissions} руб.",
                    "short": True,
                },
            ],
        }
        if with_elba_values:
            member_attachment['fields'].append({
                "title": "В Эльбу",
                "value": f"{salary.for_elba} руб.",
                "short": True,
            })
        attachments.append(member_attachment)

    (start_date, end_date) = kocherga.money.salaries.dates_period()
    header = ":moneybag: Зарплаты за "
    if start_date.month == end_date.month:
        header += f"{start_date.day}–{end_date.day} {inflected_month(start_date)}"
    else:
        header += f"{start_date.day} {inflected_month(start_date)}–{end_date.day} {inflected_month(end_date)}"
    header += ":"

    return {
        "text": header,
        "attachments": attachments,
    }


@bot.listen_to(r"покажи зарплаты")
def react_show_salaries(message):
    if not is_slava(message):
        message.reply("Только Слава может управлять зарплатами.")
        return

    salaries: SalaryContainer = kocherga.money.salaries.calculate_new_salaries()
    message.reply(**salaries_message(salaries, with_elba_values=True))


@bot.listen_to(r"отправь зарплаты")
def react_send_salaries(message):
    if not is_slava(message):
        message.reply("Только Слава может управлять зарплатами.")
        return

    salaries: SalaryContainer = kocherga.money.salaries.calculate_new_salaries()
    kocherga.money.salaries.salaries_to_payments(salaries)
    bot.send_message(
        channel="#space_staff_salaries",
        **salaries_message(salaries)
    )
