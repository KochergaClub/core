from kocherga.graphql.django_utils import DjangoObjectType, related_field
from kocherga.graphql import g, helpers

from .. import models

EmailMailchimpInterest = DjangoObjectType(
    'EmailMailchimpInterest',
    model=models.MailchimpInterest,
    db_fields=['id', 'interest_id', 'name', 'subscriber_count'],
    extra_fields=lambda: {'category': g.NN(EmailMailchimpCategory)},
)

EmailMailchimpCategory = DjangoObjectType(
    'EmailMailchimpCategory',
    model=models.MailchimpCategory,
    db_fields=['id', 'title', 'category_id'],
    related_fields={'interests': EmailMailchimpInterest},
)

EmailSubscribeChannelLog = DjangoObjectType(
    'EmailSubscribeChannelLog',
    model=models.SubscribeChannelLog,
    db_fields=['id', 'dt', 'email'],
)


def resolve_log(obj, info, **pager):
    return models.SubscribeChannelLog.objects.filter(channel=obj).relay_page(
        order='-dt', **pager
    )


EmailSubscribeChannelLogConnection = helpers.ConnectionType(EmailSubscribeChannelLog)

EmailSubscribeChannel = DjangoObjectType(
    'EmailSubscribeChannel',
    model=models.SubscribeChannel,
    db_fields=['id', 'slug'],
    related_fields=lambda: {'interests': EmailMailchimpInterest},
    extra_fields=lambda: {
        'log': helpers.ConnectionField(
            g.NN(EmailSubscribeChannelLogConnection), resolve=resolve_log
        )
    },
)
