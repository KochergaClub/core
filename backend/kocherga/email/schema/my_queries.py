from typing import Optional
from kocherga.graphql import g, helpers

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


# email_subscription: MyEmailSubscription! @auth(authenticated: true)
@c.field
def email_subscription(_):
    def resolve(_, info):
        subscription = models.MailchimpMember.get_from_mailchimp(
            info.context.user.email
        )

        # This is not technically necessary, but somehow it feels safer/saner to at least partially validate subscription
        # structure here instead of relying on GraphQL schema.
        # (I might change my mind about best practices later, but this is early days.)
        return {
            'status': subscription.status,
            'interests': subscription.interests,
        }

    return g.Field(g.NN(MyEmailSubscription), resolve=resolve)


my_queries = c.as_dict()
