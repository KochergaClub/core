from kocherga.graphql.types import DjangoObjectType
from django.conf import settings

from ...import models, markup

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


@EventsPublicEvent.field('image')
def resolve_image(obj, info):
    if obj.image:
        return settings.KOCHERGA_API_ROOT + f"/images/{obj.image}"
    else:
        return None


@EventsPublicEvent.field('description')
def resolve_description(obj, info):
    return markup.Markup(obj.description).as_plain()
