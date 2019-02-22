import asyncio
import logging

import aiogram
from aiogram import types as at, Dispatcher
from aiogram.types import Update
from aiogram.utils import executor

from kocherga.django import settings
from kocherga.mastermind_bot.interactions.interactions import register_handlers

logging.basicConfig(level="INFO")
log = logging.getLogger("mmbot")


async def upd_handler(upd: Update):
    print(upd)


def init():
    evloop = asyncio.new_event_loop()
    asyncio.set_event_loop(evloop)

    log.info("Don't forget to check proxy settings!")

    bot = aiogram.Bot(settings.MASTERMIND_BOT_CONFIG["token"])

    dsp = Dispatcher(bot)
    dsp.updates_handler.register(handler=upd_handler)
    register_handlers(dsp)
    executor.start_polling(dsp)

init()
