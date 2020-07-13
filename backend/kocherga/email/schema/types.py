from kocherga.graphql import g, django_utils

from .. import models

# type EmailMailchimpInterest {
#   id: ID!
#   interest_id: String!
#   name: String!
#   subscriber_count: Int!
# }

EmailMailchimpInterest = g.ObjectType(
    'EmailMailchimpInterest',
    g.fields(
        {
            'id': 'ID!',
            'interest_id': str,  # id in mailchimp
            'name': str,
            'subscriber_count': int,
        }
    ),
)

# type EmailMailchimpCategory {
#   id: ID!
#   title: String!
#   category_id: String!
#   interests: [EmailMailchimpInterest!]!
# }

EmailMailchimpCategory = g.ObjectType(
    'EmailMailchimpCategory',
    g.fields(
        {
            **django_utils.model_fields(
                models.MailchimpCategory, ['id', 'title', 'category_id']
            ),
            'interests': django_utils.related_field(
                models.MailchimpCategory, 'interests', item_type=EmailMailchimpInterest,
            ),
        }
    ),
)

# type EmailSubscribeChannel {
#   id: ID!
#   slug: String!
#   interests: [EmailMailchimpInterest!]!
# }

EmailSubscribeChannel = g.ObjectType(
    'EmailSubscribeChannel',
    g.fields(
        {
            **django_utils.model_fields(models.SubscribeChannel, ['id', 'slug']),
            'interests': django_utils.related_field(
                models.SubscribeChannel, 'interests', item_type=EmailMailchimpInterest,
            ),
        }
    ),
)
