from datetime import datetime
from typing import Optional

import kocherga.events.models.announcement.timepad
from kocherga.graphql import g, helpers

from .. import models, permissions
from . import types

c = helpers.Collection()


@c.class_field
class events(helpers.BaseField):
    def resolve(self, obj, info, search=None, filter=None, **pager):
        qs = models.Event.objects.all()
        if search:
            qs = qs.filter(
                title__icontains=search
            )  # TODO - use wagtail/elastic search instead
        if filter:
            if 'event_type' in filter:
                qs = qs.filter(event_type=filter['event_type'])
        return qs.relay_page(order='start', **pager)

    permissions = [permissions.manage_events]
    FilterInput = g.InputObjectType(
        'EventsFilterInput', g.input_fields({'event_type': Optional[str]})
    )

    args = {**helpers.connection_args(), 'search': Optional[str], 'filter': FilterInput}

    result = g.NN(types.EventConnection)


@c.class_field
class event(helpers.BaseField):
    def resolve(self, obj, info, event_id):
        try:
            event = models.Event.objects.get(uuid=event_id)
        except models.Event.DoesNotExist:
            return None
        return event

    permissions = [permissions.manage_events]
    args = {'event_id': 'ID!'}
    result = types.Event


@c.class_field
class eventsPrototype(helpers.BaseField):
    def resolve(self, obj, info, id):
        return models.EventPrototype.objects.get(pk=id)

    permissions = [permissions.manage_events]
    args = {'id': 'ID!'}

    result = g.NN(types.EventsPrototype)


@c.class_field
class eventsPrototypes(helpers.BaseField):
    def resolve(self, obj, info):
        return models.EventPrototype.objects.order_by('weekday').all()

    permissions = [permissions.manage_events]
    result = g.NNList(types.EventsPrototype)


@c.class_field
class publicEvents(helpers.BaseField):
    def resolve(self, obj, info, from_date=None, project_id=None, **pager):
        qs = models.Event.objects.public_only()
        if from_date:
            qs = qs.filter_by_period(
                from_date=datetime.strptime(from_date, '%Y-%m-%d').date()
            )

        if project_id is not None:
            qs = qs.filter(project_id=project_id)

        return qs.relay_page(order='start', **pager)

    permissions = []
    args = {**helpers.connection_args(), 'from_date': Optional[str], 'project_id': 'ID'}

    result = g.NN(types.EventConnection)


@c.class_field
class publicEvent(helpers.BaseField):
    def resolve(self, obj, info, event_id):
        try:
            event = models.Event.objects.public_only().get(uuid=event_id)
        except models.Event.DoesNotExist:
            return None
        return event

    permissions = []
    args = {'event_id': 'ID!'}
    result = types.Event


@c.class_field
class vkGroups(helpers.BaseField):
    def resolve(self, obj, info):
        all_groups = models.VkAnnouncement.objects.all_groups()
        return [{'name': name} for name in all_groups]

    permissions = [permissions.manage_events]
    result = g.NNList(types.VkGroup)


@c.class_field
class timepadCategories(helpers.BaseField):
    def resolve(self, obj, info):
        categories = kocherga.events.models.announcement.timepad.timepad_categories()
        return categories

    permissions = [permissions.manage_events]
    result = g.NNList(types.TimepadCategory)


@c.class_field
class eventsWeeklyDigestCurrent(helpers.BaseField):
    def resolve(self, obj, info):
        digest = models.WeeklyDigest.objects.current_digest()
        digest.create_image_if_necessary()

        return digest

    permissions = [permissions.manage_events]
    result = g.NN(types.EventsWeeklyDigest)


@c.class_field
class eventsPublicGoogleCalendar(helpers.BaseField):
    def resolve(self, obj, info):
        return models.GoogleCalendar.objects.get_public_calendar()

    permissions = []
    result = types.EventsGoogleCalendar


queries = c.as_dict()
