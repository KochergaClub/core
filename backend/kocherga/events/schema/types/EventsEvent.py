from kocherga.graphql.types import DjangoObjectType

from ...import models

EventsEvent = DjangoObjectType('EventsEvent', models.Event)

EventsEvent.set_alias('event_id', 'uuid')

EventsEvent.related_field('tickets')


@EventsEvent.field('announcements')
def resolve_timepad_category(obj, info):
    return {
        'timepad': obj.timepad_announcement,
        'vk': obj.vk_announcement,
        'fb': obj.fb_announcement,
    }
