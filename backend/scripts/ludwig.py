#!/usr/bin/env python3
import sys, pathlib, os.path
sys.path.append(
    os.path.abspath(
        str(pathlib.Path(__file__).parent.parent)
    )
)

import django
django.setup()

import locale
locale.setlocale(locale.LC_TIME, locale.normalize('ru'))

import kocherga.ludwig.basics
import kocherga.ludwig.watchmen
import kocherga.ludwig.explain
import kocherga.ludwig.lft
import kocherga.ludwig.events
import kocherga.ludwig.money
import kocherga.ludwig.video
import kocherga.ludwig.daily_tasks

from kocherga.ludwig.bot import bot


def main():
    bot.run(host='0.0.0.0', port=80)


if __name__ == "__main__":
    main()
