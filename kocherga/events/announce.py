# Glue code for posting events and updating databases.
import asyncio

import kocherga.events.timepad
import kocherga.events.vk
import kocherga.events.fb


def post_to_timepad(event):
    announcement = kocherga.events.timepad.create(event)
    event.posted_timepad = announcement.link
    event.save()

    return announcement


def post_to_vk(event):
    announcement = kocherga.events.vk.create(event)
    event.posted_vk = announcement.link
    event.save()

    return announcement


def post_to_fb(event, access_token):
    loop = asyncio.get_event_loop()
    announcement = loop.run_until_complete(kocherga.events.fb.create(event, access_token))
    event.posted_fb = announcement.link
    event.save()

    return announcement
