from kocherga.graphql import g, helpers, django_utils
from kocherga.graphql.permissions import staffonly, check_permissions
from kocherga.wagtail import graphql_utils as wagtail_utils

from kocherga.projects.schema.types import ProjectPage

from kocherga.zoom.schema import types as zoom_types

from ... import models, markup


def build_EventsEvent():
    # All EventsEvent uses are staff-only for now, but this can change in the future.
    # Don't forget to add permissions checks to all private fields when that happens!

    def build_fields():
        from .prototype import EventsPrototype
        from .feedback import EventsFeedback
        from .ticket import EventsTicket

        return g.fields(
            {
                **django_utils.model_fields(
                    models.Event,
                    [
                        'title',
                        'description',
                        'summary',
                        'timing_description_override',
                        'location',
                        'zoom_link',
                        'start',
                        'end',
                        'created',
                        'updated',
                        'published',
                        'creator',
                        'event_type',
                        'pricing_type',
                        'registration_type',
                        'realm',
                        'visitors',
                    ],
                ),
                'event_id': g.Field(
                    g.NN(g.ID), resolve=lambda obj, info: obj.uuid
                ),  # deprecated
                'id': g.Field(
                    g.NN(g.ID), resolve=lambda obj, info: obj.uuid
                ),  # uuid field, renamed for client
                'image': wagtail_utils.image_rendition_field(models.Event, 'image'),
                'announcements': announcements_field(),
                'room': room_field(),  # normalized location
                'tags': tags_field(),
                'zoom_meeting': g.Field(zoom_types.ZoomMeeting),
                'tickets': django_utils.related_field(
                    models.Event,
                    'tickets',
                    item_type=EventsTicket,
                    permissions=[staffonly],
                ),
                'feedbacks': django_utils.related_field(
                    models.Event,
                    'feedbacks',
                    item_type=EventsFeedback,
                    permissions=[staffonly],
                ),
                'prototype': g.Field(EventsPrototype),
                'project': g.Field(ProjectPage),
            }
        )

    EventsEvent = g.ObjectType('EventsEvent', build_fields)

    # announcements: EventsAnnouncements!
    def announcements_field():
        from .announcements import EventsAnnouncements

        def resolve(obj, info):
            return {
                'timepad': obj.timepad_announcement,
                'vk': obj.vk_announcement,
                'fb': obj.fb_announcement,
            }

        return g.Field(g.NN(EventsAnnouncements), resolve=resolve)

    # tags: [String!]! @staffonly
    def tags_field():
        @check_permissions([staffonly])
        def resolve(obj, info):
            return obj.tag_names()

        return g.Field(g.NNList(g.String), resolve=resolve)

    def room_field():
        def resolve(obj, info):
            return obj.get_room()

        return g.Field(g.NN(g.String), resolve=resolve)

    return EventsEvent


EventsEvent = build_EventsEvent()

EventsEventConnection = helpers.ConnectionType(EventsEvent)


def build_EventsPublicEvent():
    def resolve_description(obj, info):
        return markup.Markup(obj.description).as_plain()

    def resolve_image(obj, info):
        if not obj.image:
            return None
        return obj.image.url

    def resolve_public_tags(obj, info):
        return obj.public_tag_names()

    def my_ticket_field():
        # note that there's no @auth decorator - we don't want any errors if user is not authenticated
        def resolve(obj, info):
            if not info.context.user.is_authenticated:
                return None  # not authorized, no ticket, but that's ok

            ticket = obj.tickets.filter(user=info.context.user).first()
            return ticket

        # lazy import - avoiding circular dependency
        from .my_ticket import MyEventsTicket

        return g.Field(MyEventsTicket, resolve=resolve)

    def announcements_field():
        from .announcements import EventsAnnouncements

        def resolve(obj, info):
            return {
                'timepad': getattr(obj, 'timepad_announcement', None),
                'vk': getattr(obj, 'vk_announcement', None),
                'fb': getattr(obj, 'fb_announcement', None),
            }

        return g.Field(g.NN(EventsAnnouncements), resolve=resolve)

    from .google_event import EventsGoogleEvent
    class public_google_event_field(helpers.BaseField):
        def resolve(self, obj, info):
            return obj.public_google_event()

        permissions = []
        result = EventsGoogleEvent


    EventsPublicEvent = g.ObjectType(
        'EventsPublicEvent',
        fields=lambda: g.fields(
            {
                **django_utils.model_fields(
                    models.Event,
                    [
                        'start',
                        'end',
                        'title',
                        'summary',
                        'registration_type',
                        'pricing_type',
                        'realm',
                    ],
                ),
                'id': g.Field(g.NN(g.ID), resolve=lambda obj, info: obj.uuid),
                'event_id': g.Field(
                    g.NN(g.ID), resolve=lambda obj, info: obj.uuid
                ),  # deprecated, use `id` instead
                'description': g.Field(g.NN(g.String), resolve=resolve_description),
                'image': g.Field(
                    g.String, resolve=resolve_image
                ),  # deprecated, links to original image
                'image_rendition': wagtail_utils.image_rendition_field(
                    models.Event, 'image'
                ),
                'project': ProjectPage,
                'public_tags': g.Field(g.NNList(g.String), resolve=resolve_public_tags),
                'my_ticket': my_ticket_field(),
                'announcements': announcements_field(),
                'public_google_event': public_google_event_field().as_field(),
            }
        ),
    )

    return EventsPublicEvent


EventsPublicEvent = build_EventsPublicEvent()

EventsPublicEventConnection = helpers.ConnectionType(EventsPublicEvent)
