import logging

logger = logging.getLogger(__name__)

from typing import Optional

from kocherga.graphql import g, helpers
from kocherga.graphql.basic_types import BasicResult
from kocherga.graphql.decorators import staffonly

from ... import models

from ..types import EventsWeeklyDigest

c = helpers.Collection()


UpdateResult = g.NN(
    g.ObjectType(
        'EventsWeeklyDigestUpdateResult',
        g.fields({'ok': Optional[bool], 'digest': EventsWeeklyDigest}),
    )
)


# eventsWeeklyDigestPostVk: EventsWeeklyDigestUpdateResult! @staffonly
@c.class_field
class eventsWeeklyDigestPostVk(helpers.BaseField):
    @staffonly
    def resolve(self, _, info):
        digest = models.WeeklyDigest.objects.current_digest()
        digest.post_vk('')
        return {
            'ok': True,
            'digest': digest,
        }

    result = UpdateResult


# eventsWeeklyDigestPostTelegram: EventsWeeklyDigestUpdateResult! @staffonly
@c.class_field
class eventsWeeklyDigestPostTelegram(helpers.BaseField):
    @staffonly
    def resolve(self, _, info):
        digest = models.WeeklyDigest.objects.current_digest()
        digest.post_telegram()
        return {
            'ok': True,
            'digest': digest,
        }

    result = UpdateResult


@c.class_field
class eventsWeeklyDigestPostMailchimp(helpers.BaseFieldWithInput):
    @staffonly
    def resolve(self, _, info, input):
        text = input.get('text', '')
        digest = models.WeeklyDigest.objects.current_digest()
        digest.post_mailchimp_draft(text)
        return {
            'ok': True,
            'digest': digest,
        }

    input = {
        'text': Optional[str],
    }

    result = UpdateResult


@c.class_field
class vkWikiScheduleUpdate(helpers.BaseField):
    @staffonly
    def resolve(self, _, info, input):
        models.VkAnnouncement.objects.update_wiki_schedule()
        return {
            'ok': True,
        }

    result = BasicResult


mutations = c.as_dict()
