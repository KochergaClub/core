from kocherga.graphql.types import DjangoObjectType

from .. import models

ZoomMeeting = DjangoObjectType('ZoomMeeting', models.Meeting)
ZoomMeeting.related_field('instances')
ZoomMeeting.simple_property_field('participants_count')

ZoomMeetingInstance = DjangoObjectType('ZoomMeetingInstance', models.MeetingInstance)
ZoomMeetingInstance.related_field('participants')

types = [ZoomMeeting, ZoomMeetingInstance]
