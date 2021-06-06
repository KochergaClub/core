from typing import Optional

import dateutil.parser
import django.db.utils
import graphql
import kocherga.projects.models
import kocherga.wagtail.models
from kocherga.error import PublicError
from kocherga.graphql import django_utils, g, helpers
from kocherga.graphql.basic_types import BasicResult
from kocherga.graphql.permissions import authenticated

from ... import models, permissions
from ..types import Event

c = helpers.Collection()


EventUpdateResult = g.ObjectType(
    'EventUpdateResult', g.fields({'ok': Optional[bool], 'event': g.NN(Event)})
)


@c.class_field
class eventCreate(helpers.BaseFieldWithInput):
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

        return {
            'ok': True,
            'event': event,
        }

    permissions = [permissions.manage_events]
    input = {
        'start': str,
        'end': str,
        'title': str,
        'description': Optional[str],
        'location': Optional[str],
    }

    result = {'ok': Optional[bool], 'event': g.NN(Event)}


@c.class_field
class eventUpdate(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event_id = input['event_id']

        event = models.Event.objects.get(uuid=event_id)

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

        return {
            'ok': True,
            'event': event,
        }

    permissions = [permissions.manage_events]
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


@c.class_field
class eventDelete(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event_id = input['event_id']

        event = models.Event.objects.get(uuid=event_id)
        event.delete()

        return {'ok': True}

    permissions = [permissions.manage_events]
    input = {'event_id': 'ID!'}
    result = g.NN(BasicResult)


@c.class_field
class cancelEvent(django_utils.SmartMutationMixin, helpers.BaseFieldWithInput):
    permissions = [permissions.manage_events]
    input = {
        'event_id': 'ID!',
        'notification_message': str,
    }
    ok_result = BasicResult

    def smart_resolve(self, _, info, input):
        event_id = input['event_id']

        event = models.Event.objects.get(uuid=event_id)
        event.cancel(notification_message=input['notification_message'])

        return {'ok': True}


@c.class_field
class eventGenerateZoomLink(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event_id = input['event_id']

        event = models.Event.objects.get(uuid=event_id)
        event.generate_zoom_link()

        return {
            'ok': True,
            'event': event,
        }

    permissions = [permissions.manage_events]
    input = {'event_id': 'ID!'}
    result = g.NN(EventUpdateResult)


@c.class_field
class eventAddTag(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])

        event.add_tag(input['tag'])

        return {
            'ok': True,
            'event': event,
        }

    permissions = [permissions.manage_events]
    input = {'event_id': 'ID!', 'tag': str}
    result = g.NN(EventUpdateResult)


@c.class_field
class eventDeleteTag(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])

        event.delete_tag(input['tag'])

        return {
            'ok': True,
            'event': event,
        }

    permissions = [permissions.manage_events]
    input = {'event_id': 'ID!', 'tag': str}
    result = g.NN(EventUpdateResult)


@c.class_field
class eventMove(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])
        start = dateutil.parser.isoparse(input['start'])

        event.move(start)

        return {
            'ok': True,
            'event': event,
        }

    permissions = [permissions.manage_events]
    input = {
        'event_id': 'ID!',
        'start': str,
    }

    result = g.NN(EventUpdateResult)


@c.class_field
class eventGenerateOpenViduToken(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])

        # TODO - start openvidu session
        token = event.generate_openvidu_token(info.context.user)

        return {
            'token': token,
        }

    permissions = [authenticated]
    input = {'event_id': 'ID!'}
    result = {'token': str}


@c.class_field
class addYoutubeVideo(django_utils.SmartMutationMixin, helpers.BaseFieldWithInput):
    def smart_resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])

        # TODO - check that video exists

        try:
            event.youtube_videos.create(
                embed_id=input['embed_id']
            )
        except django.db.utils.IntegrityError:
            raise PublicError("Видео уже существует.")

        return event

    permissions = [permissions.manage_events]
    input = {
        'event_id': 'ID!',
        'embed_id': str,
    }
    ok_result = Event


@c.class_field
class deleteYoutubeVideo(django_utils.DeleteMutation):
    model = models.YoutubeVideo
    permissions = [permissions.manage_events]


mutations = c.as_dict()
