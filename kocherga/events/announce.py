# Glue code for posting events and updating databases.
import kocherga.events.db
import kocherga.events.timepad
import kocherga.events.vk
import kocherga.events.fb
import kocherga.config

TIMEPAD_ORGANIZATION = kocherga.config.config()['timepad']

def post_to_timepad(event):
    timepad_announcement = kocherga.events.timepad.create(event)

    kocherga.events.db.set_event_property(
        event.google_id,
        'posted-timepad',
        timepad_announcement.link
    )

    return timepad_announcement

def post_to_vk(event):
    announcement = kocherga.events.vk.create(event)
    kocherga.events.db.set_event_property(
        event.google_id,
        'posted-vk',
        announcement.link
    )

    return announcement

async def post_to_fb(event):
    announcement = await kocherga.events.fb.create(event)
    kocherga.events.db.set_event_property(
        event.google_id,
        'posted-fb',
        announcement.link
    )

    return announcement
