from io import BytesIO
import dateutil.parser
from typing import Optional

import requests
import graphql

from kocherga.graphql import g, helpers
from kocherga.graphql.basic_types import BasicResult
from kocherga.graphql.decorators import staffonly, auth
import kocherga.wagtail.models

import kocherga.projects.models

from ... import models
from ..types import EventsEvent

c = helpers.Collection()


# type EventUpdateResult {
#   ok: Boolean
#   event: EventsEvent!
# }
EventUpdateResult = g.ObjectType(
    'EventUpdateResult', g.fields({'ok': Optional[bool], 'event': g.NN(EventsEvent)})
)


# eventCreate(input: EventCreateInput!): EventCreateResult! @staffonly
@c.class_field
class eventCreate(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        title = input['title']
        start = input['start']
        end = input['end']

        start = dateutil.parser.isoparse(start)
        end = dateutil.parser.isoparse(end)

        params = {
            'title': title,
            'start': start,
            'end': end,
            'creator': info.context.user.email,
        }

        # optional fields
        for field in ('description', 'location'):
            if field in input:
                params[field] = input[field]

        event = models.Event.objects.create(**params)
        models.Event.objects.notify_update()  # send notification message to websocket

        return {
            'ok': True,
            'event': event,
        }

    input = graphql.build_ast_schema(
        graphql.parse(
            """
            input EventCreateInput {
                start: String!
                end: String!
                title: String!
                description: String
                location: String
            }"""
        )
    ).get_type('EventCreateInput')

    # type EventCreateResult {
    #   ok: Boolean
    #   event: EventsEvent!
    # }
    result = {'ok': Optional[bool], 'event': g.NN(EventsEvent)}


# eventUpdate(input: EventUpdateInput!): EventUpdateResult! @staffonly
@c.class_field
class eventUpdate(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        event_id = input['event_id']

        event = models.Event.objects.get(uuid=event_id)
        assert not event.deleted

        for field in (
            'published',
            'visitors',
            'title',
            'description',
            'summary',
            'event_type',
            'registration_type',
            'pricing_type',
            'realm',
            'timing_description_override',
            'location',
            'zoom_link',
        ):
            if field in input:
                setattr(event, field, input[field])

        if 'start' in input:
            event.start = dateutil.parser.isoparse(input['start'])

        if 'end' in input:
            event.end = dateutil.parser.isoparse(input['end'])

        if 'prototype_id' in input:
            if not input['prototype_id']:
                event.prototype = None
            else:
                event.prototype = models.EventPrototype.objects.get(
                    pk=input['prototype_id']
                )

        if 'project_slug' in input:
            if not input['project_slug']:
                event.project = None
            else:
                event.project = (
                    kocherga.projects.models.ProjectPage.objects.live()
                    .public()
                    .get(slug=input['project_slug'])
                )

        if 'image_id' in input:
            if not input['image_id']:
                event.image = None
            else:
                # TODO - check image access permissions
                # TODO - make image public if necessary
                event.image = kocherga.wagtail.models.CustomImage.objects.get(
                    pk=input['image_id']
                )

        event.full_clean()
        event.save()
        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    input = graphql.build_ast_schema(
        graphql.parse(
            """
            input EventUpdateInput {
              event_id: ID!
              start: String
              end: String
              published: Boolean
              visitors: String
              title: String
              description: String
              summary: String
              event_type: String
              registration_type: String
              pricing_type: String
              realm: String
              timing_description_override: String
              location: String
              zoom_link: String
              prototype_id: ID
              project_slug: String
              image_id: ID
            }
            """
        )
    ).get_type('EventUpdateInput')

    result = g.NN(EventUpdateResult)


# eventDelete(input: EventDeleteInput!): BasicResult! @staffonly
@c.class_field
class eventDelete(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        event_id = input['event_id']

        event = models.Event.objects.get(uuid=event_id)
        assert not event.deleted
        event.delete()
        models.Event.objects.notify_update()

        return {'ok': True}

    input = {'event_id': 'ID!'}

    result = g.NN(BasicResult)


# eventSetEventType(input: EventSetEventTypeInput!): EventUpdateResult! @staffonly
@c.class_field
class eventSetEventType(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        event_id = input['event_id']
        event_type = input['event_type']

        event = models.Event.objects.get(uuid=event_id)
        assert not event.deleted

        event.event_type = event_type
        event.full_clean()
        event.save()
        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    input = {'event_id': 'ID!', 'event_type': str}

    result = g.NN(EventUpdateResult)


# eventSetRealm(input: EventSetRealmInput!): EventUpdateResult! @staffonly
@c.class_field
class eventSetRealm(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        event_id = input['event_id']
        realm = input['realm']

        event = models.Event.objects.get(uuid=event_id)
        assert not event.deleted

        event.realm = realm
        event.full_clean()
        event.save()
        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    input = {'event_id': 'ID!', 'realm': str}

    result = g.NN(EventUpdateResult)


# eventSetPricingType(input: EventSetPricingTypeInput!): EventUpdateResult! @staffonly
@c.class_field
class eventSetPricingType(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        event_id = input['event_id']
        pricing_type = input['pricing_type']

        event = models.Event.objects.get(uuid=event_id)
        assert not event.deleted

        event.pricing_type = pricing_type
        event.full_clean()
        event.save()
        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    input = {'event_id': 'ID!', 'pricing_type': str}

    result = g.NN(EventUpdateResult)


# eventSetZoomLink(input: EventSetZoomLinkInput!): EventUpdateResult! @staffonly
@c.class_field
class eventSetZoomLink(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        event_id = input['event_id']
        zoom_link = input['zoom_link']

        event = models.Event.objects.get(uuid=event_id)
        event.set_zoom_link(zoom_link)
        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    input = {'event_id': 'ID!', 'zoom_link': str}

    result = g.NN(EventUpdateResult)


# eventGenerateZoomLink(input: EventGenerateZoomLinkInput!): EventUpdateResult! @staffonly
@c.class_field
class eventGenerateZoomLink(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        event_id = input['event_id']

        event = models.Event.objects.get(uuid=event_id)
        event.generate_zoom_link()
        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    input = {'event_id': 'ID!'}

    result = g.NN(EventUpdateResult)


# eventAddTag(input: EventAddTagInput!): EventUpdateResult! @staffonly
@c.class_field
class eventAddTag(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])

        event.add_tag(input['tag'])
        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    input = {'event_id': 'ID!', 'tag': str}

    result = g.NN(EventUpdateResult)


# eventDeleteTag(input: EventDeleteTagInput!): EventUpdateResult! @staffonly
@c.class_field
class eventDeleteTag(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])

        event.delete_tag(input['tag'])
        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    input = {'event_id': 'ID!', 'tag': str}
    result = g.NN(EventUpdateResult)


# eventSetImageFromUrl(input: EventSetImageFromUrlInput!): EventUpdateResult! @staffonly
@c.class_field
class eventSetImageFromUrl(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])

        url = input['url']

        r = requests.get(url)
        r.raise_for_status()

        fh = BytesIO(r.content)
        event.add_image(fh)
        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    input = {'event_id': 'ID!', 'url': str}
    result = g.NN(EventUpdateResult)


# eventMove(input: EventMoveInput!): EventUpdateResult! @staffonly
@c.class_field
class eventMove(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])
        start = dateutil.parser.isoparse(input['start'])

        event.move(start)
        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    input = {
        'event_id': 'ID!',
        'start': str,
    }

    result = g.NN(EventUpdateResult)


# eventGenerateOpenViduToken(
#   input: EventGenerateOpenViduTokenInput
# ): EventGenerateOpenViduTokenResult @auth(authenticated: true)
@c.class_field
class eventGenerateOpenViduToken(helpers.BaseFieldWithInput):
    @auth(authenticated=True)
    def resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])

        # TODO - start openvidu session
        token = event.generate_openvidu_token(info.context.user)

        return {
            'token': token,
        }

    input = {'event_id': 'ID!'}

    result = {'token': str}


mutations = c.as_dict()
