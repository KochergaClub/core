from kocherga.graphql.types import DjangoObjectType

from ... import models

EventsEvent = DjangoObjectType('EventsEvent', models.Event)

EventsEvent.set_alias('event_id', 'uuid')  # deprecated
EventsEvent.set_alias('id', 'uuid')

EventsEvent.related_field('tickets')

EventsEvent.image_field('image')


@EventsEvent.field('announcements')
def resolve_timepad_category(obj, info):
    return {
        'timepad': obj.timepad_announcement,
        'vk': obj.vk_announcement,
        'fb': obj.fb_announcement,
    }


@EventsEvent.field('tags')
def resolve_tags(obj, info):
    return obj.tag_names()


@EventsEvent.field('room')
def resolve_room(obj, info):
    return obj.get_room()
