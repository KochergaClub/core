from kocherga.ludwig.bot import bot

import kocherga.money.cashier

@bot.command('/cash')
def command_current_cash(payload):
    return kocherga.money.cashier.current_cash()
