from ariadne import MutationType

from .. import models

Mutation = MutationType()


@Mutation.field('emailSubscribeChannelDelete')
def emailSubscribeChannelDelete(_, info, slug):
    models.SubscribeChannel.objects.get(slug=slug).delete()
    return True


@Mutation.field('emailSubscribeChannelCreate')
def emailSubscribeChannelCreate(_, info, params):
    slug = params['slug']
    interest_ids = params['interest_ids']
    interests = models.MailchimpInterest.objects.filter(interest_id__in=interest_ids).all()
    instance = models.SubscribeChannel.objects.create(slug=slug)
    instance.interests.set(interests)
    return True


@Mutation.field('emailSubscribeChannelAddEmail')
def emailSubscribeChannelAddEmail(_, info, slug, email):
    channel = models.SubscribeChannel.objects.get(slug=slug)
    channel.subscribe_email(email)
    return True


def member_from_info(info):
    return models.MailchimpMember.get_from_mailchimp(info.context.user.email)


@Mutation.field('myEmailResubscribe')
def myEmailResubscribe(_, info):
    member_from_info(info).set_status(
        'pending',
        check_old_status='unsubscribed'
    )
    return True


@Mutation.field('myEmailUnsubscribe')
def myEmailUnsubscribe(_, info):
    member_from_info(info).set_status(
        'unsubscribed',
        check_old_status='subscribed'
    )
    return True


@Mutation.field('myEmailSubscribeToInterest')
def myEmailSubscribeToInterest(_, info, interest_id):
    member_from_info(info).subscribe_to_interest(interest_id)
    return True


@Mutation.field('myEmailUnsubscribeFromInterest')
def myEmailUnsubscribeFromInterest(_, info, interest_id):
    member_from_info(info).unsubscribe_from_interest(interest_id)
    return True
