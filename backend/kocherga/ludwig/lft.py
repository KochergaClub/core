import random
import pathlib

from kocherga.ludwig.bot import bot


def quote_lft():
    lines = open(
        pathlib.Path(__file__).parent.parent.parent / "static" / "lft.txt"
    ).readlines()
    line_id = random.randint(0, len(lines) - 1)
    return "> {}".format(lines[line_id])


@bot.respond_to(r"процитируй лфт")
def react_quote_lft(message):
    return quote_lft()


@bot.listen_to(r"хочу цитату из лфт")
def react_quote_lft2(message):
    return quote_lft()
