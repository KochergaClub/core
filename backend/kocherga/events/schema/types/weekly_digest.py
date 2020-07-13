from typing import Optional

from kocherga.graphql import g, helpers, django_utils
from kocherga.wagtail import graphql_utils as wagtail_utils

from ... import models


EventsWeeklyDigest = g.ObjectType(
    'EventsWeeklyDigest',
    lambda: g.fields(
        {
            **django_utils.model_fields(models.WeeklyDigest, ['id', 'start']),
            'image': wagtail_utils.image_rendition_field(models.WeeklyDigest, 'image'),
            'mailchimp': mailchimp_field().as_field(),
            'telegram': telegram_field().as_field(),
            'vk': vk_field().as_field(),
        }
    ),
)


class mailchimp_field(helpers.BaseField):
    def resolve(self, obj, info):
        return {
            'link': obj.mailchimp_campaign_link(),
        }

    permissions = []
    result = g.NN(
        g.ObjectType('EventsWeeklyDigestMailchimp', g.fields({'link': Optional[str]}))
    )


class telegram_field(helpers.BaseField):
    def resolve(self, obj, info):
        return {
            'link': obj.telegram_link(),
        }

    permissions = []
    result = g.NN(
        g.ObjectType('EventsWeeklyDigestTelegram', g.fields({'link': Optional[str]}))
    )


class vk_field(helpers.BaseField):
    def resolve(self, obj, info):
        return {
            'link': obj.vk_link(),
        }

    permissions = []
    result = g.NN(
        g.ObjectType('EventsWeeklyDigestVk', g.fields({'link': Optional[str]}))
    )
