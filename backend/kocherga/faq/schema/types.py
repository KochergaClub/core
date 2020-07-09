from kocherga.graphql import g, django_utils
from kocherga.wagtail import graphql_utils as wagtail_utils

from kocherga.wagtail.schema.types import WagtailPage

from .. import models

FaqEntry = g.ObjectType(
    'FaqEntry',
    g.fields(
        {
            **django_utils.model_fields(models.Entry, ['id', 'question']),
            'answer': wagtail_utils.richtext_field(models.Entry, 'answer'),
        }
    ),
)

FaqPage = g.ObjectType(
    'FaqPage',
    interfaces=[WagtailPage],
    fields=lambda: g.fields(
        {
            **wagtail_utils.basic_fields(),
            **django_utils.model_fields(models.FAQPage, ['title', 'summary']),
            'prev_page': FaqPage,
            'next_page': FaqPage,
            'entries': django_utils.related_field(
                models.FAQPage, 'entries', item_type=FaqEntry
            ),
            'subpages': g.NNList(FaqPage),
        }
    ),
)

exported_types = [FaqPage]
