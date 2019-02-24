import logging
logger = logging.getLogger(__name__)

import aiogram
from aiogram import types as at, Dispatcher
from aiogram.types import Update
from aiogram.utils import executor

import asyncio
from concurrent.futures.thread import ThreadPoolExecutor
from multiprocessing.managers import BaseManager
from threading import Thread
from typing import Awaitable, Callable

from kocherga.django import settings
from kocherga.mastermind_dating.interactions.interactions import register_handlers, tinder_activate

def init_rpc(evloop, bot):

    # pool = ThreadPoolExecutor()

    async def tinder_activate_wrapper(user_id):
        try:
            await tinder_activate(user_id, bot)
        except:
            logger.exception('Something went wrong during tinder_activate')


    def run_async(method: Callable[[], Awaitable]):
        def run(*args, **kwargs):
            evloop.create_task(method(*args, **kwargs))
        return run


    def run_rpc_server():
        manager = BaseManager(address=('', 44444), authkey=b"django_sec_key")
        manager.register("tinder_activate", run_async(tinder_activate_wrapper))
        server = manager.get_server()
        server.serve_forever()


    t1 = Thread(target=run_rpc_server)
    t1.start()


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

    init_rpc(evloop, bot)
    executor.start_polling(dsp)
