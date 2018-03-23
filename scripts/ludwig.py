#!/usr/bin/env python3
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import locale
locale.setlocale(locale.LC_TIME, locale.normalize('ru'))

import kocherga.ludwig.basics
import kocherga.ludwig.watchmen
import kocherga.ludwig.explain
import kocherga.ludwig.lft
import kocherga.ludwig.events
import kocherga.ludwig.crypto

from kocherga.ludwig.bot import bot

def main():
    bot.run()

if __name__ == "__main__":
    main()
