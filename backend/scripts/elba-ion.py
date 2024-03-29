#!/usr/bin/env python3
import sys, pathlib, os.path
sys.path.append(
    os.path.abspath(
        str(pathlib.Path(__file__).parent.parent)
    )
)

import django
django.setup()

import logging
import asyncio

import kocherga.money.elba
from datetime import datetime

logging.basicConfig(level=logging.INFO)


async def main():
    await kocherga.money.elba.make_ion_requests(
        [
            datetime.strptime(s, '%d.%m.%Y').date()
            for s in ('27.08.2018',)
        ],
        [],
        []
    )

loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait([main()]))
