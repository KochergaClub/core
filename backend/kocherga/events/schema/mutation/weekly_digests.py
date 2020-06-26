import logging

logger = logging.getLogger(__name__)

from ariadne import MutationType

from ... import models

Mutation = MutationType()


@Mutation.field('eventsWeeklyDigestPostVk')
def eventsWeeklyDigestPostVk(_, info):
    digest = models.WeeklyDigest.objects.current_digest()
    digest.post_vk('')
    return {
        'ok': True,
        'digest': digest,
    }


@Mutation.field('eventsWeeklyDigestPostTelegram')
def eventsWeeklyDigestPostTelegram(_, info):
    digest = models.WeeklyDigest.objects.current_digest()
    digest.post_telegram()
    return {
        'ok': True,
        'digest': digest,
    }


@Mutation.field('eventsWeeklyDigestPostMailchimp')
def eventsWeeklyDigestPostMailchimp(_, info, input):
    text = input.get('text', '')
    digest = models.WeeklyDigest.objects.current_digest()
    digest.post_mailchimp_draft(text)
    return {
        'ok': True,
        'digest': digest,
    }


@Mutation.field('vkWikiScheduleUpdate')
def vkWikiScheduleUpdate(_, info):
    models.VkAnnouncement.objects.update_wiki_schedule()
    return {
        'ok': True,
    }
