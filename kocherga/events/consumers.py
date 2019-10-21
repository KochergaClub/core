import logging
logger = logging.getLogger(__name__)

from asgiref.sync import async_to_sync

from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist

from channels.generic.websocket import SyncConsumer, WebsocketConsumer
from reversion.models import Version

from kocherga.dateutils import humanize_date, dts

from .models import Event, GoogleCalendar


class UpdatesWebsocketConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            'events_group',
            self.channel_name
        )
        self.accept()

    def notify_update(self, message):
        self.send(text_data='updated')


class NotifySlackConsumer(SyncConsumer):
    def version_to_user_text(self, version):
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

    def notify_by_version(self, message):
        version_id = message['version_id']
        version = Version.objects.get(pk=version_id)

        all_versions = Version.objects.get_for_object_reference(Event, version.object_id)
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
        room = version.field_dict['location']  # TODO - kocherga.room.pretty(obj.get_room())

        attachments = [
            {
                "title": version.field_dict['title'],
                "text": f"{day_str}, {start:%H:%M} в {room}"
            }
        ]

        user_text = self.version_to_user_text(version)

        async_to_sync(self.channel_layer.send)("slack-notify", {
            "type": "notify",
            "channel": "#calendar",
            "text": f'{text} ({user_text})',
            "attachments": attachments,
        })


class GoogleExportConsumer(SyncConsumer):
    def event_to_google(self, event):
        return {
            "summary": event.title,
            "description": event.description,
            "location": event.location,
            "start": {"dateTime": dts(event.start)},
            "end": {"dateTime": dts(event.end)},
        }

    def export_event(self, message):
        event_pk = message['event_pk']
        event = Event.objects.get(pk=event_pk)

        for google_calendar in GoogleCalendar.objects.all():
            # TODO - try/catch?
            google_calendar.export_event(event)
