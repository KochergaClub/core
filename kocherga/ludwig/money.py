from kocherga.ludwig.bot import bot

import kocherga.money.cashier
import kocherga.money.salaries
import kocherga.team


def cash_response():
    cash = kocherga.money.cashier.current_cash()
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


def salaries_message():
    salaries = kocherga.money.salaries.calculate_new_salaries()

    attachments = []
    for email, salary in salaries.salaries.items():
        if salary.total == 0:
            continue

        member = kocherga.team.find_member_by_email(email)

        attachments.append({
            "text": f"{member.short_name} <@{member.slack_id}>: *{salary.total}*",
            "fields": [
                {
                    "title": "Смены",
                    "value": salary.shifts,
                    "short": True,
                },
                {
                    "title": "2%",
                    "value": salary.commissions,
                    "short": True,
                },
            ],
        })

    return {
        "text": "Зарплаты",
        "attachments": "attachments",
    }


@bot.listen_to(r"покажи зарплаты")
def react_show_salaries(message):
    if not is_slava(message):
        message.reply("Только Слава может управлять зарплатами.")
        return

    message.reply(**salaries_message())


@bot.listen_to(r"отправь зарплаты")
def react_send_salaries(message):
    if not is_slava(message):
        message.reply("Только Слава может управлять зарплатами.")
        return

    bot.send_message(
        channel="#general",
        **salaries_message()
    )
