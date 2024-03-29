#!/usr/bin/env python3
import os.path
import pathlib
import sys

sys.path.append(os.path.abspath(str(pathlib.Path(__file__).parent.parent)))

import django

django.setup()

import django.utils.timezone
import kocherga.events.models
import kocherga.kkm.models
import kocherga.vk.tools
from apscheduler.schedulers.blocking import BlockingScheduler
from django.db import transaction
from kocherga.events.models import VkAnnouncement


def job_wrapper(func):
    @transaction.atomic
    def wrap():
        func()

    return wrap


def main():
    scheduler = BlockingScheduler(timezone=django.utils.timezone.get_current_timezone())

    scheduler.add_job(
        func=job_wrapper(VkAnnouncement.objects.update_widget),
        trigger='interval',
        name='update_vk_widget',
        minutes=1,
        jitter=20,
    )

    scheduler.add_job(
        func=job_wrapper(VkAnnouncement.objects.update_wiki_schedule),
        trigger='interval',
        name='update_vk_wiki_schedule',
        minutes=1,
        jitter=20,
    )

    scheduler.add_job(
        func=job_wrapper(kocherga.vk.tools.update_cover),
        trigger='interval',
        name='update_vk_cover',
        minutes=2,
        jitter=30,
    )

    scheduler.add_job(
        func=job_wrapper(kocherga.events.models.Ticket.objects.send_reminders),
        trigger='interval',
        name='send_ticket_reminders',
        minutes=30,
    )

    scheduler.add_job(
        func=job_wrapper(VkAnnouncement.objects.repost_to_daily),
        trigger='cron',
        name='repost_to_daily',
        hour=8,
        minute=0,
        second=0,
    )

    scheduler.add_job(
        func=job_wrapper(
            lambda: kocherga.kkm.models.Controller.load().auto_close_shift()
        ),
        trigger='interval',
        name='kkm_close_shift',
        # auto_close_shift manages shift durations by itself, but we don't want to try to often in case of crazy bugs
        minutes=30,
    )

    scheduler.start()


if __name__ == '__main__':
    main()
