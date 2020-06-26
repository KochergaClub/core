from ariadne import ObjectType
from datetime import datetime

import kocherga.events.models


def create_PhotoRibbonBlock():
    PhotoRibbonBlock = ObjectType('PhotoRibbonBlock')

    @PhotoRibbonBlock.field('value')
    def resolve_value(obj, info, spec):
        return [image.get_rendition(spec) for image in obj.value]

    return PhotoRibbonBlock


def create_EventsListBlock():
    EventsListBlock = ObjectType('EventsListBlock')

    @EventsListBlock.field('events')
    def resolve_events(obj, info):
        qs = kocherga.events.models.Event.objects.public_events(
            from_date=datetime.today()
        )
        return qs[:20]

    return EventsListBlock


types = [create_PhotoRibbonBlock(), create_EventsListBlock()]
