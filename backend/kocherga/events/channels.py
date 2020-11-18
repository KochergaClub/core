import logging

logger = logging.getLogger(__name__)

import kocherga.slack.channels
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone
from kocherga.dateutils import humanize_date
from kocherga.django.channels_utils import ChannelsGroup, channel_send
from reversion.models import Version

from channels.consumer import SyncConsumer

from .models import Event, GoogleCalendar

WORKER_CHANNEL = 'events-worker'


update_group = ChannelsGroup('event_updates')


def notify_slack_by_event_version(version_id: int):
    channel_send(
        WORKER_CHANNEL,
        {"type": "notify_slack_by_event_version", "version_id": version_id},
    )


def export_event_to_google(event_pk: int):
    channel_send(
        WORKER_CHANNEL,
        {"type": "export_event_to_google", "event_pk": event_pk},
    )


class EventsWorker(SyncConsumer):
    def _version_to_user_text(self, version):
        user = version.revision.user
        user_text = user.email
        try:
            slack_id = user.staff_member.slack_id
            if slack_id:
                user_text = f'<@{slack_id}>'
            else:
                user_text = user.staff_member.full_name
        except ObjectDoesNotExist:
            pass  # that's ok

        return user_text

    def notify_slack_by_event_version(self, message):
        version_id = message['version_id']
        version = Version.objects.get(pk=version_id)

        all_versions = Version.objects.get_for_object_reference(
            Event, version.object_id
        )
        logger.info(f'Total versions: {all_versions.count()}')
        is_new = all_versions.count() == 1

        logger.info(version.field_dict)
        text = None
        if version.field_dict['deleted']:
            text = "Событие отменено"
        elif is_new:
            text = "Новое событие"
        else:
            text = "Событие обновлено"

        start = timezone.localtime(version.field_dict['start'])
        day_str = humanize_date(start).capitalize()

        attachments = [
            {
                "title": version.field_dict['title'],
                "text": f"{day_str}, {start:%H:%M}",
            }
        ]

        user_text = self._version_to_user_text(version)

        kocherga.slack.channels.notify(
            channel="#calendar",
            text=f'{text} ({user_text})',
            attachments=attachments,
        )

    def export_event_to_google(self, message):
        event_pk = message['event_pk']
        event = Event.all_objects.get(pk=event_pk)

        for google_calendar in GoogleCalendar.objects.all():
            # TODO - try/catch?
            google_calendar.export_event(event)


workers = {
    WORKER_CHANNEL: EventsWorker.as_asgi(),
}
