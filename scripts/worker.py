#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

from apscheduler.schedulers.blocking import BlockingScheduler

import kocherga.events.vk
import kocherga.vk.tools
from kocherga.db import Session

def job_wrapper(func):
    # Without this the connection can cache the old data if transaction isolation level is set to REPEATABLE READ.
    # (See https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html for details.)
    Session.remove()
    func()

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
