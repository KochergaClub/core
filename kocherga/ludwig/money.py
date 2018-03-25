from kocherga.ludwig.bot import bot

import kocherga.money.cashier

@bot.command('/cash')
def command_current_cash(payload):
    cash = kocherga.money.cashier.current_cash()
    return f'В кассе {cash} руб.'
