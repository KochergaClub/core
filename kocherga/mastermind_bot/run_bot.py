import asyncio
import base64
import logging
from .models import get_user

import aiogram
from aiogram.types import Message
from aiogram.utils import executor
from .models import User, KchUser, Vote

from kocherga.django import settings

logging.basicConfig(level="INFO")
log = logging.getLogger("mmbot")


def init():
    evloop = asyncio.new_event_loop()
    asyncio.set_event_loop(evloop)

    log.info("Don't forget to check proxy settings!")

    bot = aiogram.Bot(settings.MASTERMIND_BOT_CONFIG["token"])
    dsp = aiogram.dispatcher.Dispatcher(bot)

    u: User = User.objects.get(user=KchUser.objects.get(id=1))
    print(u.generate_token())

    #
    # async def loop():
    #     offset = 0
    #     while True:
    #         updates = await bot.get_updates(offset=offset)
    #         for upd in updates:
    #             print(upd.as_json())
    #
    #         if len(updates):
    #             offset = updates[0].update_id + 1
    #         pass
    # evloop.run_until_complete(loop())

    @dsp.message_handler(commands=["start"])
    async def start(msg: Message):
        token = msg.get_args()
        user = get_user(token)
        if user is None:
            return
        user.uid = msg.from_user.username
        user.save()
        await msg.reply("Вы зарегестрированы!")

    executor.start_polling(dsp)


init()
