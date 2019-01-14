#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

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

    scheduler.start()

if __name__ == '__main__':
    main()
