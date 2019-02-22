import asyncio
import logging

import aiogram
from aiogram import types
from aiogram.types import Update

from kocherga.django import settings
from kocherga.mastermind_bot.interactions.interactions import Root
from .models import User, KchUser

logging.basicConfig(level="INFO")
log = logging.getLogger("mmbot")


async def upd_handler(upd: Update):
    print(upd)


def init():
    evloop = asyncio.new_event_loop()
    asyncio.set_event_loop(evloop)

    log.info("Don't forget to check proxy settings!")

    bot = aiogram.Bot(settings.MASTERMIND_BOT_CONFIG["token"])

    dispatcher = Root()

    async def loop():
        bot.set_current(bot)
        offset = 0
        while True:
            updates = await bot.get_updates(offset=offset)
            for upd in updates:
                # Copied from dispatcher
                if upd.message:
                    types.User.set_current(upd.message.from_user)
                    types.Chat.set_current(upd.message.chat)
                if upd.edited_message:
                    types.User.set_current(upd.edited_message.from_user)
                    types.Chat.set_current(upd.edited_message.chat)
                if upd.channel_post:
                    types.Chat.set_current(upd.channel_post.chat)
                if upd.edited_channel_post:
                    types.Chat.set_current(upd.edited_channel_post.chat)
                if upd.inline_query:
                    types.User.set_current(upd.inline_query.from_user)
                if upd.chosen_inline_result:
                    types.User.set_current(upd.chosen_inline_result.from_user)
                if upd.callback_query:
                    if upd.callback_query.message:
                        types.Chat.set_current(upd.callback_query.message.chat)
                    types.User.set_current(upd.callback_query.from_user)
                if upd.shipping_query:
                    types.User.set_current(upd.shipping_query.from_user)
                if upd.pre_checkout_query:
                    types.User.set_current(upd.pre_checkout_query.from_user)

                Update.set_current(upd)
                await dispatcher.handle_update(upd)

            if len(updates):
                offset = updates[0].update_id + 1
            pass

    evloop.run_until_complete(loop())

    # dsp.updates_handler.register(handler=upd_handler)
    # print(dsp.updates_handler.handlers)
    #
    # @dsp.message_handler(commands=["start"])
    # async def start(msg: Message):
    #     token = msg.get_args()
    #     user = get_mm_user_by_token(token)
    #     if user is None:
    #         await bot.send_message("Зайдите в личный кабинет Кочерги и перейдите на бота там!")
    #         return
    #     user.uid = msg.from_user.username
    #     user.save()
    #     await bot.send_message(msg.chat.id, "Вы успешно зарегестрированы!")

    # executor.start_polling(dsp, fast=False)


init()
