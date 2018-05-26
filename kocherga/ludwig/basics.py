import sys
from kocherga.ludwig.bot import bot


def suicide(message):
    message.reply("Умираю!")
    sys.exit()


@bot.listen_to(r"привет,?\s+людвиг")
def react_hello(message):
    return "Привет!"


@bot.listen_to(r"людвиг,?\s+умри")
def react_die(message):
    suicide(message)


def add_simple_interactions():
    interactions = [
        (r"Какой\s+номер\s+(у\s+)?Кочерги\?", "+7(499)350-20-42"),
        (r"Как\s+позвонить\s+в\s+кочергу\?", "+7(499)350-20-42"),
        (r"Людвиг, ты солнышко", ":heart:"),
        (r"Людвиг, ты лапочка", ":smile_cat:"),
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

    def gen_cb(response):

        def f(msg, *args):
            return response

        return f

    for interaction in interactions:
        bot.dispatcher.register_listener(interaction[0], gen_cb(interaction[1]))


add_simple_interactions()
