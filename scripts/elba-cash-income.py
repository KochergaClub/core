#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import fire

import logging
import asyncio
from datetime import datetime, timedelta

import kocherga.money.elba
import kocherga.money.ofd.models

logging.basicConfig(level=logging.INFO)


async def async_main(start_date_str, last_pko_id):
    start_d = datetime.strptime(start_date_str, '%Y-%m-%d').date()
    end_d = (datetime.now() - timedelta(days=3)).date()

    cash_income = kocherga.money.ofd.models.cash_income_by_date(start_d, end_d)

    await kocherga.money.elba.add_cash_income(
        cash_income,
        last_pko_id=last_pko_id,
    )


def main(start_date_str, last_pko_id):
    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncio.wait([async_main(start_date_str, last_pko_id)]))


if __name__ == '__main__':
    fire.Fire(main)
