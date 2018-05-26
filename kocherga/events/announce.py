# Glue code for posting events and updating databases.
import kocherga.events.timepad
import kocherga.events.vk
import kocherga.events.fb
import kocherga.config

TIMEPAD_ORGANIZATION = kocherga.config.config()["timepad"]


def post_to_timepad(event):
    timepad_announcement = kocherga.events.timepad.create(event)

    event.set_prop("posted-timepad", timepad_announcement.link)

    return timepad_announcement


def post_to_vk(event):
    announcement = kocherga.events.vk.create(event)
    event.set_prop("posted-vk", announcement.link)

    return announcement


async def post_to_fb(event, access_token):
    announcement = await kocherga.events.fb.create(event, access_token)
    event.set_prop("posted-fb", announcement.link)

    return announcement
