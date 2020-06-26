from ariadne import QueryType
from datetime import datetime

from .. import models
import kocherga.events.models.announcement.timepad

Query = QueryType()


# test
@Query.field('events')
def resolve_events(self, info, search=None, filter=None, **pager):
    qs = models.Event.objects.list_events()
    if search:
        qs = qs.filter(title__icontains=search)
    if filter:
        if 'event_type' in filter:
            qs = qs.filter(event_type=filter['event_type'])
    return qs.relay_page(order='start', **pager)


@Query.field('event')
def resolve_event(self, info, event_id):
    try:
        event = models.Event.objects.list_events().get(uuid=event_id)
    except models.Event.DoesNotExist:
        return None
    return event


@Query.field('eventsPrototype')
def resolve_eventsPrototype(self, info, id):
    return models.EventPrototype.objects.get(pk=id)


@Query.field('eventsPrototypes')
def resolve_eventsPrototypes(self, info):
    return models.EventPrototype.objects.order_by('weekday').all()


@Query.field('publicEvents')
def resolve_publicEvents(self, info, from_date=None, project_id=None, **pager):
    qs = models.Event.objects.public_events(
        from_date=datetime.strptime(from_date, '%Y-%m-%d').date()
        if from_date
        else None,
    )

    if project_id is not None:
        qs = qs.filter(project_id=project_id)

    return qs.relay_page(order='start', **pager)


@Query.field('publicEvent')
def resolve_publicEvent(self, info, event_id):
    event = models.Event.objects.public_events().get(uuid=event_id)
    return event


@Query.field('vkGroups')
def resolve_vkGroups(self, info):
    all_groups = models.VkAnnouncement.objects.all_groups()
    return [{'name': name,} for name in all_groups]


@Query.field('timepadCategories')
def resolve_timepadCategories(self, info):
    categories = kocherga.events.models.announcement.timepad.timepad_categories()
    return categories


@Query.field('eventsWeeklyDigestCurrent')
def resolve_eventsWeeklyDigestCurrent(self, info):
    digest = models.WeeklyDigest.objects.current_digest()
    digest.create_image_if_necessary()

    return digest


@Query.field('eventsPublicGoogleCalendar')
def resolve_publicGoogleCalendar(self, info):
    return models.GoogleCalendar.objects.get_public_calendar()
