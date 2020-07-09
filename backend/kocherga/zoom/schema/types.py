from typing import Optional

from kocherga.graphql import g, django_utils

from .. import models
from kocherga.graphql.decorators import auth

ZoomMeeting = g.ObjectType(
    'ZoomMeeting',
    lambda: g.fields(
        {
            **django_utils.model_fields(models.Meeting, ['id', 'zoom_id', 'join_url']),
            'participants_count': Optional[int],
            'instances': django_utils.related_field(
                models.Meeting, 'instances', ZoomMeetingInstance
            ),
        }
    ),
)

# type ZoomMeetingInstance {
#   id: ID!
#   zoom_uuid: String!

#   start_time: String!
#   end_time: String!

#   participants: [ZoomParticipant!]! @auth(permission: "zoom.view_participants")
# }


ZoomMeetingInstance = g.ObjectType(
    'ZoomMeetingInstance',
    lambda: g.fields(
        {
            **django_utils.model_fields(
                models.MeetingInstance, ['id', 'zoom_uuid', 'start_time', 'end_time']
            ),
            'participants': django_utils.related_field(
                models.MeetingInstance,
                'participants',
                item_type=ZoomParticipant,
                decorator=auth(permission='zoom.view_participants'),
            ),
        }
    ),
)

ZoomParticipant = g.ObjectType(
    'ZoomParticipant',
    lambda: g.fields(
        {
            **django_utils.model_fields(
                models.Participant, ['id', 'name', 'join_time', 'leave_time']
            )
        }
    ),
)
