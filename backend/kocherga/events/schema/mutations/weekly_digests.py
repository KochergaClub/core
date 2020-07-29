import logging

logger = logging.getLogger(__name__)

from typing import Optional

from kocherga.graphql import g, helpers
from kocherga.graphql.basic_types import BasicResult
from kocherga.graphql.permissions import staffonly

from ... import models

from ..types import EventsWeeklyDigest

c = helpers.Collection()


UpdateResult = g.NN(
    g.ObjectType(
        'EventsWeeklyDigestUpdateResult',
        g.fields({'ok': Optional[bool], 'digest': g.NN(EventsWeeklyDigest)}),
    )
)


# eventsWeeklyDigestPostVk: EventsWeeklyDigestUpdateResult! @staffonly
@c.class_field
class eventsWeeklyDigestPostVk(helpers.BaseField):
    def resolve(self, _, info):
        digest = models.WeeklyDigest.objects.current_digest()
        digest.post_vk('')
        return {'ok': True, 'digest': digest}

    permissions = [staffonly]
    result = UpdateResult


# eventsWeeklyDigestPostTelegram: EventsWeeklyDigestUpdateResult! @staffonly
@c.class_field
class eventsWeeklyDigestPostTelegram(helpers.BaseField):
    def resolve(self, _, info):
        digest = models.WeeklyDigest.objects.current_digest()
        digest.post_telegram()
        return {'ok': True, 'digest': digest}

    permissions = [staffonly]
    result = UpdateResult


@c.class_field
class eventsWeeklyDigestPostMailchimp(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        text = input.get('text', '')
        digest = models.WeeklyDigest.objects.current_digest()
        digest.post_mailchimp_draft(text)
        return {'ok': True, 'digest': digest}

    permissions = [staffonly]
    input = {'text': Optional[str]}

    result = UpdateResult


@c.class_field
class vkWikiScheduleUpdate(helpers.BaseField):
    def resolve(self, _, info):
        models.VkAnnouncement.objects.update_wiki_schedule()
        return {'ok': True}

    permissions = [staffonly]
    result = BasicResult


mutations = c.as_dict()
