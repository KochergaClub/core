from django.conf import settings

from kocherga.ludwig.bot import bot

import kocherga.money.cashier.models
import kocherga.money.salaries
from kocherga.money.salaries import SalaryContainer
import kocherga.staff.tools
from kocherga.staff.models import Member
from kocherga.dateutils import inflected_month

SALARIES_CHANNEL = '#space_staff_salaries'


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
    blocks = []

    (start_date, end_date) = kocherga.money.salaries.dates_period()
    header = ":moneybag: *Зарплаты за "
    if start_date.month == end_date.month:
        header += f"{start_date.day}–{end_date.day} {inflected_month(start_date)}*"
    else:
        header += f"{start_date.day} {inflected_month(start_date)}–{end_date.day} {inflected_month(end_date)}*"

    blocks.append({
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": header,
        }
    })
    blocks.append({"type": "divider"})

    total_cash_payments = 0
    for member_id, salary in salaries.salaries.items():
        if salary.total == 0:
            continue

        member = Member.objects.get(pk=member_id)

        payment_emoji = ''
        if member.payment_type == 'CASH':
            payment_emoji = ':dollar:'
            total_cash_payments += salary.total
        elif member.payment_type == 'ELECTRONIC':
            payment_emoji = ':credit_card:'

        member_block = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"{member.short_name} <@{member.slack_id}>\n{payment_emoji} *{salary.total}* руб.",
            },
        }
        if member.slack_image:
            member_block["accessory"] = {
                "type": "image",
                "image_url": member.slack_image,
                "alt_text": member.short_name,
            }
        if with_elba_values:
            member_block["text"]["text"] += f"\nВ Эльбу: {salary.for_elba} руб."

        comment_block = {
            "type": "context",
            "elements": [
                {
                    "type": "mrkdwn",
                    "text": f"Смены: {salary.shifts} руб."
                            f" 2% бонус: {salary.commissions} руб."
                            f" Грейд: {member.watchman.grade.code}",
                }
            ]
        }

        blocks.append(member_block)
        blocks.append(comment_block)
        blocks.append({"type": "divider"})

    blocks.append({
        "type": "context",
        "elements": [
            {
                "type": "mrkdwn",
                "text": f"Всего наличных в кассе: {kocherga.money.cashier.models.current_cash()} руб.",
            },
            {
                "type": "mrkdwn",
                "text": f"Всего к выдаче наличными: {total_cash_payments} руб.",
            },
            {
                "type": "mrkdwn",
                "text": f"Не забудьте отметить выданные деньги в {settings.KOCHERGA_WEBSITE}/team/cashier.",
            },
        ]
    })

    return {
        "text": header,
        "blocks": blocks,
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
        channel=SALARIES_CHANNEL,
        **salaries_message(salaries)
    )
