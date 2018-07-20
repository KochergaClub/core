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


@bot.listen_to(r"покажи зарплаты")
def react_show_salaries(message):
    user_id = message.body["user"]
    response = message.sc.api_call("users.info", user=user_id)
    if not response["ok"]:
        raise Exception("Couldn't load user info")

    email = response["user"]["profile"]["email"]
    if email != "slava@kocherga-club.ru":
        message.reply("Только Слава может управлять зарплатами.")
        return

    salaries = kocherga.money.salaries.calculate_new_salaries()

    attachments = []
    for email, salary in salaries.salaries.items():
        member = kocherga.team.find_member_by_email(email)
        attachments.append({
            "text": member.short_name,
            "fields": [
                {
                    "title": "Смены",
                    "value": salary.shifts,
                },
                {
                    "title": "2%",
                    "value": salary.commissions,
                },
                {
                    "title": "Всего",
                    "value": salary.total,
                }
            ],
        })

    message.reply(**{
        text: "Зарплаты",
        attachments: attachments,
    })

@bot.listen_to(r"отправь зарплаты")
def react_send_salaries(message):
    message.reply("Пока не умею.")
