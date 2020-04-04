#!/usr/bin/env python
import sys, pathlib, os.path
sys.path.append(
    os.path.abspath(
        str(pathlib.Path(__file__).parent.parent)
    )
)

import django
django.setup()

from apscheduler.schedulers.blocking import BlockingScheduler

from kocherga.events.models import VkAnnouncement
import kocherga.vk.tools

from django.db import transaction
import django.utils.timezone


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
    )

    scheduler.add_job(
        func=job_wrapper(kocherga.vk.tools.update_cover),
        trigger='interval',
        name='update_vk_cover',
        minutes=2,
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

    scheduler.start()


if __name__ == '__main__':
    main()
