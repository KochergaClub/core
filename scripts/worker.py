#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

from apscheduler.schedulers.blocking import BlockingScheduler

import kocherga.events.vk
import kocherga.vk.tools

def main():
    scheduler = BlockingScheduler()

    scheduler.add_job(
        func=kocherga.events.vk.update_widget,
        trigger="interval",
        name='update_vk_widget',
        minutes=1,
        jitter=300,
    )

    scheduler.add_job(
        func=kocherga.vk.tools.update_cover,
        trigger="interval",
        name='update_vk_cover',
        minutes=2,
        jitter=300,
    )

    scheduler.start()

if __name__ == '__main__':
    main()
