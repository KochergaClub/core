import logging
logger = logging.getLogger(__name__)

import asyncio

import aiogram
from aiogram import types as at, Dispatcher
from aiogram.types import Update
from aiogram.utils import executor

from kocherga.django import settings
from kocherga.mastermind_dating.interactions.interactions import register_handlers

def init():
    evloop = asyncio.new_event_loop()
    asyncio.set_event_loop(evloop)

    logger.info("Don't forget to check proxy settings!")

    bot_extra_settings = {}
    if 'proxy' in settings.MASTERMIND_BOT_CONFIG:
        bot_extra_settings['proxy'] = settings.MASTERMIND_BOT_CONFIG['proxy']

    bot = aiogram.Bot(
        settings.MASTERMIND_BOT_CONFIG["token"],
        **bot_extra_settings,
    )

    dsp = Dispatcher(bot)
    register_handlers(dsp)
    executor.start_polling(dsp)
