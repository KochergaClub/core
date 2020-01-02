from ariadne import ObjectType

from .. import models

My = ObjectType('My')


@My.field('email_subscription')
def resolve_email_subscription(_, info):
    subscription = models.MailchimpMember.get_from_mailchimp(info.context.user.email)

    # This is not technically necessary, but somehow it feels safer/saner to at least partially validate subscription
    # structure here instead of relying on GraphQL schema.
    # (I might change my mind about best practices later, but this is early days.)
    return {
        'status': subscription['status'],
        'interests': subscription.get('interests'),
    }
