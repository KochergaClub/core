import logging

logger = logging.getLogger(__name__)

from typing import Optional

import kocherga.django.schema.types
from kocherga.django.errors import GenericError
from kocherga.error import PublicError
from kocherga.graphql import g, helpers
from kocherga.graphql.basic_types import BasicResult

from ... import models, permissions
from ..types import EventsWeeklyDigest

c = helpers.Collection()


# TODO - replace with union pattern
UpdateResult = g.NN(
    g.ObjectType(
        'EventsWeeklyDigestUpdateResult',
        g.fields({'ok': Optional[bool], 'digest': g.NN(EventsWeeklyDigest)}),
    )
)


@c.class_field
class eventsWeeklyDigestPostVk(helpers.BaseField):
    def resolve(self, _, info):
        digest = models.WeeklyDigest.objects.current_digest()
        digest.post_vk('')
        return {'ok': True, 'digest': digest}

    permissions = [permissions.manage_events]
    result = UpdateResult


@c.class_field
class eventsWeeklyDigestPostTelegram(helpers.BaseField):
    def resolve(self, _, info):
        digest = models.WeeklyDigest.objects.current_digest()
        digest.post_telegram()
        return {'ok': True, 'digest': digest}

    permissions = [permissions.manage_events]
    result = UpdateResult


@c.class_field
class eventsWeeklyDigestPostMailchimp(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        text_before = input.get('text_before', '')
        text_after = input.get('text_after', '')
        digest = models.WeeklyDigest.objects.current_digest()
        digest.post_mailchimp_draft(
            text_before=text_before,
            text_after=text_after,
        )
        return {'ok': True, 'digest': digest}

    permissions = [permissions.manage_events]
    input = {
        'text_before': Optional[str],
        'text_after': Optional[str],
    }

    result = UpdateResult


@c.class_field
class cancelWeeklyDigestMailchimp(helpers.UnionFieldMixin, helpers.BaseField):
    def resolve(self, _, info):
        digest = models.WeeklyDigest.objects.current_digest()
        try:
            digest.cancel_mailchimp_draft()
        except PublicError as e:
            return GenericError(e.message)
        return digest

    permissions = [permissions.manage_events]
    result_types = {
        GenericError: kocherga.django.schema.types.GenericError,
        models.WeeklyDigest: EventsWeeklyDigest,
    }


@c.class_field
class sendWeeklyDigestMailchimp(helpers.UnionFieldMixin, helpers.BaseField):
    def resolve(self, _, info):
        digest = models.WeeklyDigest.objects.current_digest()
        try:
            digest.send_mailchimp()
        except PublicError as e:
            return GenericError(e.message)
        return digest

    permissions = [permissions.manage_events]
    result_types = {
        GenericError: kocherga.django.schema.types.GenericError,
        models.WeeklyDigest: EventsWeeklyDigest,
    }


@c.class_field
class vkWikiScheduleUpdate(helpers.BaseField):
    def resolve(self, _, info):
        models.VkAnnouncement.objects.update_wiki_schedule()
        return {'ok': True}

    permissions = [permissions.manage_events]
    result = BasicResult


mutations = c.as_dict()
