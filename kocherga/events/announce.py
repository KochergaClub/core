# Glue code for posting events and updating databases.
import kocherga.events.timepad
import kocherga.events.vk
import kocherga.events.fb
import kocherga.config

TIMEPAD_ORGANIZATION = kocherga.config.config()["timepad"]


def post_to_timepad(event):
    announcement = kocherga.events.timepad.create(event)
    event.posted_timepad = announcement.link

    return announcement


def post_to_vk(event):
    announcement = kocherga.events.vk.create(event)
    event.posted_vk = announcement.link

    return announcement


async def post_to_fb(event, access_token):
    announcement = await kocherga.events.fb.create(event, access_token)
    event.posted_fb = announcement.link

    return announcement
