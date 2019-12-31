from kocherga.ariadne import DjangoObjectType

from ... import models

EmailMailchimpCategory = DjangoObjectType('EmailMailchimpCategory', models.MailchimpCategory)

EmailMailchimpCategory.related_field('interests')
