from kocherga.graphql.types import DjangoObjectType

from .. import models

FaqPage = DjangoObjectType('FaqPage', models.FAQPage)

FaqPage.related_field('entries')
FaqPage.simple_property_field('prev_page')
FaqPage.simple_property_field('next_page')
FaqPage.simple_property_field('subpages')

types = [FaqPage]
