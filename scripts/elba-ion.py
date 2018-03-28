#!/usr/bin/env python

import time
from datetime import datetime
import sqlite3
import logging
import re

import asyncio
import pyppeteer

import kocherga.money.elba

logging.basicConfig(level=logging.INFO)

async def main():
    await kocherga.money.elba.make_ion_requests(
        [],
        [],
        []
    )

loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait([main()]))
