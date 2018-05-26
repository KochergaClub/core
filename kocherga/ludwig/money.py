from kocherga.ludwig.bot import bot

import kocherga.money.cashier


def cash_response():
    cash = kocherga.money.cashier.current_cash()
    return f"В кассе {cash} руб."


@bot.listen_to(r"сколько\s+(сейчас\s+)?денег\s+в\s+кассе")
def react_current_cash(message, query):
    message.reply(cash_response())


@bot.command("/cash")
def command_current_cash(payload):
    return cash_response()
