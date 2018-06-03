import sys
from kocherga.ludwig.bot import bot

from slappy import Listener

def suicide(message):
    message.reply("Умираю!")
    sys.exit()


@bot.respond_to(r"привет")
def react_hello(message):
    return "Привет!"


@bot.respond_to(r"умри")
def react_die(message):
    suicide(message)


def add_simple_interactions():
    listen_interactions = [
        (r"Какой\s+номер\s+(у\s+)?Кочерги\?", "+7(499)350-20-42"),
        (r"Как\s+позвонить\s+в\s+кочергу\?", "+7(499)350-20-42"),
        (
            r"не работает мыш(ка|ь)",
            "В ноуте барахлит один usb-разъём (правый ближний), возможно, дело в этом?",
        ),
        (
            r"не работает (клава|клавиатура)",
            "Клавиатура в админском ноуте сломана. Подключи внешнюю.",
        ),
        (
            r"не (работает|подключается) (VR|ВР|шлем)",
            "Почитай: https://wiki.admin.kocherga.club/VR",
        ),
    ]

    respond_interactions = [
        (r"ты солнышко", ":heart:"),
        (r"ты лапочка", ":smile_cat:"),
    ]

    def gen_cb(response):

        def f(msg, *args):
            return response

        return f

    for interaction in listen_interactions:
        bot.dispatcher.register_listener(
            Listener(interaction[0], gen_cb(interaction[1]))
        )

    for interaction in respond_interactions:
        bot.dispatcher.register_listener(
            Listener(interaction[0], gen_cb(interaction[1]), mention_only=True)
        )


add_simple_interactions()
