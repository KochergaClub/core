import logging
logger = logging.getLogger(__name__)

import json

from kocherga.events.models import TimepadAnnouncement
import kocherga.timepad.api


def export_events_dataset():
    for announcement in TimepadAnnouncement.objects.all():
        if not announcement.link:
            continue
        if not announcement.link.startswith('http'):
            continue

        try:
            timepad_event_id = announcement.get_timepad_event_id()
        except Exception:
            logger.exception('oops')
            continue

        event = kocherga.timepad.api.api_call('GET', f'events/{timepad_event_id}')
        print(json.dumps({
            'created_at': event['created_at'],
            'starts_at': event['starts_at'],
            'tickets_total': event['registration_data']['tickets_total'],
            'name': event['name'],
        }, ensure_ascii=False))
