import logging
logger = logging.getLogger(__name__)

import aiogram
from aiogram import Dispatcher
from aiogram.utils import executor

import asyncio
from threading import Thread
from multiprocessing.managers import BaseManager
from typing import Awaitable, Callable


from django.conf import settings
from .interactions.interactions import register_handlers, tinder_activate
from .solver import broadcast_solution


# Not in .rpc because of cyclic imports :(
def get_server(evloop, bot):
    def run_async(method: Callable[[], Awaitable]):
        def run(*args, **kwargs):
            evloop.create_task(method(*args, **kwargs))
        return run

    manager = BaseManager(address=('', 44444), authkey=b"django_sec_key")
    manager.register("tinder_activate", run_async(lambda participant_id: tinder_activate(participant_id, bot)))
    manager.register("broadcast_solution", run_async(lambda cohort_id: broadcast_solution(cohort_id, bot)))
    server = manager.get_server()

    return server


def init_rpc(evloop, bot):
    def run_rpc_server():
        server = get_server(evloop, bot)
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

    # check connection
    me = evloop.run_until_complete(dsp.bot.me)
    logger.info(me)

    init_rpc(evloop, bot)
    executor.start_polling(dsp)
