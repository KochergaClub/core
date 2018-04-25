#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import logging
import asyncio
import json
from datetime import datetime

import kocherga.money.elba

logging.basicConfig(level=logging.INFO)

async def main():
    filename = '/Users/berekuk/Downloads/query_result_2018-04-25T11_28_59.559Z.json'
    await kocherga.money.elba.add_cash_income(
        json.load(open(filename)),
        802,
        from_date=datetime(2018,3,27).date()
    )

loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait([main()]))
