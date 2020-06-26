import asyncio

import telethon
from django.db import models

import kocherga.telegram.core_api


class GroupManager(models.Manager):
    def get_empty(self):
        return (
            self.annotate(participant_count=models.Count('participants'))
            .filter(participant_count=0)
            .first()
        )

    async def _async_create_for_cohort(self, cohort):
        if not cohort.leader_telegram_uid:
            raise Exception(
                "Can't create group when cohort.leader_telegram_uid is not set"
            )

        client = await kocherga.telegram.core_api.get_client()

        updates = await client(
            telethon.functions.messages.CreateChatRequest(
                users=['KochergaMastermindBot', cohort.leader_telegram_uid],
                title='Мастермайнд-группа',
            )
        )
        chat = updates.chats[0]

        invite_link_obj = await client(
            telethon.functions.messages.ExportChatInviteRequest(peer=chat.id)
        )
        invite_link = invite_link_obj.link

        group = self.create(telegram_invite_link=invite_link, cohort=cohort,)
        return group

    def create_for_cohort(self, cohort):
        loop = asyncio.get_event_loop()
        group = loop.run_until_complete(self._async_create_for_cohort(cohort))
        return group


class Group(models.Model):
    telegram_invite_link = models.CharField(max_length=255)
    cohort = models.ForeignKey(
        'Cohort',
        on_delete=models.PROTECT,
        related_name='groups',
        null=True,
        blank=True,  # will become required later when we run the first migration
    )

    objects = GroupManager()

    def print_lliira_table(self):
        for participant in self.participants.all():
            print(f'{participant.name:<28}' + participant.timetable().lliira_line())
