from kocherga.graphql.types import DjangoObjectType

from ...import models

EventsPublicEvent = DjangoObjectType('EventsPublicEvent', models.Event)

EventsPublicEvent.set_alias('event_id', 'uuid')


@EventsPublicEvent.field('my_ticket')
def resolve_my_ticket(obj, info):
    if not info.context.user.is_authenticated:
        return None  # not authorized, no ticket, but that's ok

    ticket = obj.tickets.filter(user=info.context.user).first()
    return ticket


@EventsPublicEvent.field('announcements')
def resolve_announcements(obj, info):
    return {
        'timepad': getattr(obj, 'timepad_announcement', None),
        'vk': getattr(obj, 'vk_announcement', None),
        'fb': getattr(obj, 'fb_announcement', None),
    }
