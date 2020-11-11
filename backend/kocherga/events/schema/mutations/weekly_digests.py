import logging

logger = logging.getLogger(__name__)

from typing import Optional

from kocherga.graphql import g, helpers
from kocherga.graphql.basic_types import BasicResult

from ... import models, permissions
from ..types import EventsWeeklyDigest

c = helpers.Collection()


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
        text = input.get('text', '')
        digest = models.WeeklyDigest.objects.current_digest()
        digest.post_mailchimp_draft(text)
        return {'ok': True, 'digest': digest}

    permissions = [permissions.manage_events]
    input = {'text': Optional[str]}

    result = UpdateResult


@c.class_field
class vkWikiScheduleUpdate(helpers.BaseField):
    def resolve(self, _, info):
        models.VkAnnouncement.objects.update_wiki_schedule()
        return {'ok': True}

    permissions = [permissions.manage_events]
    result = BasicResult


mutations = c.as_dict()
