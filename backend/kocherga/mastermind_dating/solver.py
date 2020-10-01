import asyncio
import logging
import typing

from aiogram import Bot
from django.template.loader import render_to_string

from . import models

logging.basicConfig(level="DEBUG")
log = logging.getLogger("mm-bot-solver")


async def broadcast_solution(cohort_id: int, bot: Bot):
    log.info("Broadcasting solution")

    cohort = models.Cohort.objects.get(pk=cohort_id)

    tasks: typing.List[typing.Awaitable] = []

    for participant in cohort.participants.all():
        if not participant.group:
            log.warn('No group for participant ' + str(participant.id))
            continue

        message = render_to_string(
            "mastermind_dating/bot/group_assembled.md",
            {
                "participants": [
                    p
                    for p in participant.group.participants.all()
                    if p.id != participant.id
                ],
                "invite_link": participant.group.telegram_invite_link,
            },
        )
        tasks.append(
            asyncio.create_task(
                bot.send_message(
                    participant.get_chat_id(),
                    message,
                    # parse_mode="Markdown"
                )
            )
        )

    log.info(f"Awaiting {len(tasks)} to finish")
    for task in tasks:
        await task
    log.info("Broadcast complete")
