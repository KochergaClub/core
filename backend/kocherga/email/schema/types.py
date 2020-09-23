from kocherga.graphql.django_utils import DjangoObjectType
from kocherga.graphql import g

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

EmailSubscribeChannel = DjangoObjectType(
    'EmailSubscribeChannel',
    model=models.SubscribeChannel,
    db_fields=['id', 'slug'],
    related_fields={'interests': EmailMailchimpInterest},
)
