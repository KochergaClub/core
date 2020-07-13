from typing import Optional
from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import authenticated

from .. import models

c = helpers.Collection()


MyEmailSubscriptionInterest = g.ObjectType(
    'MyEmailSubscriptionInterest',
    g.fields({'id': 'ID!', 'name': str, 'subscribed': Optional[bool]}),
)

MyEmailSubscription = g.ObjectType(
    'MyEmailSubscription',
    g.fields({'status': str, 'interests': g.List(g.NN(MyEmailSubscriptionInterest))}),
)


@c.class_field
class email_subscription(helpers.BaseField):
    def resolve(self, _, info):
        subscription = models.MailchimpMember.get_from_mailchimp(
            info.context.user.email
        )

        # This is not technically necessary, but somehow it feels safer/saner to at least partially validate
        # subscription structure here instead of relying on GraphQL schema.
        # (I might change my mind about best practices later, but this code was written in early days of graphql
        # adoption.)
        return {
            'status': subscription.status,
            'interests': subscription.interests,
        }

    permissions = [authenticated]
    result = g.NN(MyEmailSubscription)


my_queries = c.as_dict()
