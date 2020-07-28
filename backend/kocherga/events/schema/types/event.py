from kocherga.graphql import django_utils, g, helpers
from kocherga.graphql.permissions import check_permissions, staffonly
from kocherga.projects.schema.types import ProjectPage
from kocherga.wagtail import graphql_utils as wagtail_utils
from kocherga.zoom.schema import types as zoom_types

from ... import markup, models

EventsMarkupFormat = g.EnumType(
    'EventsMarkupFormat', {'SOURCE': 'SOURCE', 'PLAIN': 'PLAIN'}
)


def build_event_fields():
    def description_field():
        def resolve(obj, info, format=None):
            # PLAIN is default for now, for backward-compatibility
            if format == 'PLAIN' or format is None:
                return markup.Markup(obj.description).as_plain()
            elif format == 'SOURCE' or format is None:
                return obj.description
            else:
                raise Exception(f"Unknown markup format {format}")

        args = g.arguments({'format': EventsMarkupFormat})
        return g.Field(g.NN(g.String), args=args, resolve=resolve)

    def resolve_public_tags(obj, info):
        return obj.public_tag_names()

    def tags_field():
        @check_permissions([staffonly])
        def resolve(obj, info):
            return obj.tag_names()

        return g.Field(g.NNList(g.String), resolve=resolve)

    def room_field():
        @check_permissions([staffonly])
        def resolve(obj, info):
            return obj.get_room()

        return g.Field(g.NN(g.String), resolve=resolve)

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

    from .feedback import EventsFeedback
    from .ticket import EventsTicket
    from .prototype import EventsPrototype

    return g.fields(
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
                    'published',
                    'event_type',
                ],
            ),
            'id': g.Field(g.NN(g.ID), resolve=lambda obj, info: obj.uuid),
            'event_id': g.Field(
                g.NN(g.ID), resolve=lambda obj, info: obj.uuid
            ),  # deprecated, use `id` instead
            'description': description_field(),
            'image': wagtail_utils.image_rendition_field(models.Event, 'image'),
            'project': ProjectPage,
            'public_tags': g.Field(g.NNList(g.String), resolve=resolve_public_tags),
            'tags': tags_field(),
            'my_ticket': my_ticket_field(),
            'announcements': announcements_field(),
            'public_google_event': public_google_event_field().as_field(),
            'zoom_meeting': helpers.field_with_permissions(
                zoom_types.ZoomMeeting, [staffonly]
            ),
            'prototype': helpers.field_with_permissions(EventsPrototype, [staffonly]),
            'visitors': helpers.field_with_permissions(g.String, [staffonly]),
            'creator': helpers.field_with_permissions(g.String, [staffonly]),
            'created': helpers.field_with_permissions(g.NN(g.String), [staffonly]),
            'updated': helpers.field_with_permissions(g.NN(g.String), [staffonly]),
            'location': helpers.field_with_permissions(g.NN(g.String), [staffonly]),
            'room': room_field(),
            'zoom_link': helpers.field_with_permissions(g.NN(g.String), [staffonly]),
            'timing_description_override': helpers.field_with_permissions(
                g.NN(g.String), [staffonly]
            ),
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
        }
    )


Event = g.ObjectType('Event', fields=build_event_fields)

EventConnection = helpers.ConnectionType(Event)
