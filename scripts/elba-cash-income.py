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
    filename = '/Users/berekuk/Downloads/query_result_2018-03-28T01_17_47.234Z.json'
    await kocherga.money.elba.add_cash_income(
        json.load(open(filename)),
        732,
        from_date=datetime(2018,1,15).date()
    )

loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait([main()]))
