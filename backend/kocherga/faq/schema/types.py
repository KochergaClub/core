from kocherga.graphql.types import DjangoObjectType

from .. import models

FaqPage = DjangoObjectType('FaqPage', models.FAQPage)

FaqPage.related_field('entries')

types = [FaqPage]
