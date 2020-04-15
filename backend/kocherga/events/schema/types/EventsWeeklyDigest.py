from kocherga.graphql.types import DjangoObjectType

from ... import models

EventsWeeklyDigest = DjangoObjectType('EventsWeeklyDigest', models.WeeklyDigest)

EventsWeeklyDigest.image_field('image')


@EventsWeeklyDigest.field('mailchimp')
def resolve_mailchimp(obj, info):
    return {
        'link': obj.mailchimp_campaign_link(),
    }


@EventsWeeklyDigest.field('telegram')
def resolve_telegram(obj, info):
    return {
        'link': obj.telegram_link(),
    }


@EventsWeeklyDigest.field('vk')
def resolve_vk(obj, info):
    return {
        'link': obj.vk_link(),
    }
