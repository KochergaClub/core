from typing import Optional

from kocherga.graphql import django_utils

from .. import models
from kocherga.graphql.permissions import user_perm

ZoomMeeting = django_utils.DjangoObjectType(
    'ZoomMeeting',
    model=models.Meeting,
    db_fields=['id', 'zoom_id', 'join_url'],
    related_fields=lambda: {'instances': ZoomMeetingInstance},
    extra_fields={'participants_count': Optional[int]},
)

ZoomMeetingInstance = django_utils.DjangoObjectType(
    'ZoomMeetingInstance',
    model=models.MeetingInstance,
    db_fields=['id', 'zoom_uuid', 'start_time', 'end_time'],
    extra_fields=lambda: {
        'participants': django_utils.related_field(
            models.MeetingInstance,
            'participants',
            item_type=ZoomParticipant,
            permissions=[user_perm('zoom.view_participants')],
        ),
    },
)

ZoomParticipant = django_utils.DjangoObjectType(
    'ZoomParticipant',
    model=models.Participant,
    db_fields=['id', 'name', 'join_time', 'leave_time'],
)
