#!/usr/bin/env python
import sys, pathlib, os.path
sys.path.append(
    os.path.abspath(
        str(pathlib.Path(__file__).parent.parent)
    )
)

import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "kocherga.django.settings")
django.setup()

from apscheduler.schedulers.blocking import BlockingScheduler

import kocherga.events.vk
import kocherga.vk.tools

from django.db import transaction

def job_wrapper(func):
    @transaction.atomic
    def wrap():
        func()

    return wrap

def main():
    scheduler = BlockingScheduler()

    scheduler.add_job(
        func=job_wrapper(kocherga.events.vk.update_widget),
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
        func=job_wrapper(kocherga.events.vk.repost_to_daily),
        trigger='cron',
        name='repost_to_daily',
        hour=8,
        minute=0,
        second=0,
    )

    scheduler.start()

if __name__ == '__main__':
    main()
