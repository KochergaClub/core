from kocherga.graphql.types import DjangoObjectType

from .. import models

ZoomMeeting = DjangoObjectType('ZoomMeeting', models.Meeting)
ZoomMeeting.related_field('participants')

types = [ZoomMeeting]
