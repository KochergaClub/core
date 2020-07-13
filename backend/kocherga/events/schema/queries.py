from datetime import datetime
from typing import Optional

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly

from .. import models
from . import types
import kocherga.events.models.announcement.timepad

c = helpers.Collection()


# events(
#   search: String
#   filter: EventsFilterInput
#   before: String
#   after: String
#   first: Int
#   last: Int
# ): EventsEventConnection! @staffonly
@c.class_field
class events(helpers.BaseField):
    def resolve(self, obj, info, search=None, filter=None, **pager):
        qs = models.Event.objects.list_events()
        if search:
            qs = qs.filter(title__icontains=search)
        if filter:
            if 'event_type' in filter:
                qs = qs.filter(event_type=filter['event_type'])
        return qs.relay_page(order='start', **pager)

    permissions = [staffonly]
    # input EventsFilterInput {
    #   event_type: String
    # }
    FilterInput = g.InputObjectType(
        'EventsFilterInput', g.input_fields({'event_type': Optional[str]})
    )

    args = {**helpers.connection_args(), 'search': Optional[str], 'filter': FilterInput}

    result = g.NN(types.EventsEventConnection)


# event(event_id: ID!): EventsEvent @staffonly
@c.class_field
class event(helpers.BaseField):
    def resolve(self, obj, info, event_id):
        try:
            event = models.Event.objects.list_events().get(uuid=event_id)
        except models.Event.DoesNotExist:
            return None
        return event

    permissions = [staffonly]
    args = {'event_id': 'ID!'}
    result = types.EventsEvent


# eventsPrototype(id: ID!): EventsPrototype! @staffonly
@c.class_field
class eventsPrototype(helpers.BaseField):
    def resolve(self, obj, info, id):
        return models.EventPrototype.objects.get(pk=id)

    permissions = [staffonly]
    args = {'id': 'ID!'}

    result = g.NN(types.EventsPrototype)


# eventsPrototypes: [EventsPrototype!]! @staffonly
@c.class_field
class eventsPrototypes(helpers.BaseField):
    def resolve(self, obj, info):
        return models.EventPrototype.objects.order_by('weekday').all()

    permissions = [staffonly]
    result = g.NNList(types.EventsPrototype)


# publicEvents(
#   from_date: String
#   project_id: ID
#   before: String
#   after: String
#   first: Int
#   last: Int
# ): EventsPublicEventConnection!
@c.class_field
class publicEvents(helpers.BaseField):
    def resolve(self, obj, info, from_date=None, project_id=None, **pager):
        qs = models.Event.objects.public_events(
            from_date=datetime.strptime(from_date, '%Y-%m-%d').date()
            if from_date
            else None,
        )

        if project_id is not None:
            qs = qs.filter(project_id=project_id)

        return qs.relay_page(order='start', **pager)

    permissions = []
    args = {**helpers.connection_args(), 'from_date': Optional[str], 'project_id': 'ID'}

    result = g.NN(types.EventsPublicEventConnection)


# publicEvent(event_id: ID!): EventsPublicEvent!
@c.class_field
class publicEvent(helpers.BaseField):
    def resolve(self, obj, info, event_id):
        event = models.Event.objects.public_events().get(uuid=event_id)
        return event

    permissions = []
    args = {'event_id': 'ID!'}
    result = g.NN(types.EventsPublicEvent)


# vkGroups: [VkGroup!]! @staffonly
@c.class_field
class vkGroups(helpers.BaseField):
    def resolve(self, obj, info):
        all_groups = models.VkAnnouncement.objects.all_groups()
        return [{'name': name} for name in all_groups]

    permissions = [staffonly]
    result = g.NNList(types.VkGroup)


# timepadCategories: [TimepadCategory!]! @staffonly
@c.class_field
class timepadCategories(helpers.BaseField):
    def resolve(self, obj, info):
        categories = kocherga.events.models.announcement.timepad.timepad_categories()
        return categories

    permissions = [staffonly]
    result = g.NNList(types.TimepadCategory)


# eventsWeeklyDigestCurrent: EventsWeeklyDigest! @staffonly
@c.class_field
class eventsWeeklyDigestCurrent(helpers.BaseField):
    def resolve(self, obj, info):
        digest = models.WeeklyDigest.objects.current_digest()
        digest.create_image_if_necessary()

        return digest

    permissions = [staffonly]
    result = g.NN(types.EventsWeeklyDigest)


# eventsPublicGoogleCalendar: EventsGoogleCalendar
@c.class_field
class eventsPublicGoogleCalendar(helpers.BaseField):
    def resolve(self, obj, info):
        return models.GoogleCalendar.objects.get_public_calendar()

    permissions = []
    result = types.EventsGoogleCalendar


queries = c.as_dict()
