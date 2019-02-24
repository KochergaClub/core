import asyncio
import logging
import typing

from aiogram import Bot
from django.template.loader import render_to_string

from . import models

logging.basicConfig(level="DEBUG")
log = logging.getLogger("mm-bot-solver")


async def broadcast_solution(cohort_id: int, bot: Bot):
    log.info(f"Broadcasting solution")

    cohort = models.Cohort.objects.get(pk=cohort_id)

    tasks: typing.List[typing.Awaitable] = []

    for user in models.User.objects.filter(cohort=cohort):
        if not user.group:
            log.warn('No group for user ' + user.telegram_uid)
            continue

        message = render_to_string("mastermind_dating/bot/group_assembled.md", {
            "users": [
                u
                for u in user.group.users.all()
                if u.user_id != user.user_id
            ]
        })
        tasks.append(asyncio.create_task(
            bot.send_message(
                user.chat_id, message,
                parse_mode="Markdown"
            )
        ))

    log.info(f"Awaiting {len(tasks)} to finish")
    for task in tasks:
        await task
    log.info(f"Broadcast complete")
