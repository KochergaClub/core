from kocherga.wagtail.utils import filter_queryset_by_page_permissions
from kocherga.wagtail import graphql_utils as wagtail_utils
from kocherga.wagtail.graphql_utils import WagtailBlockType
from kocherga.wagtail.schema.types import WagtailBlock
from kocherga.graphql import g

from ... import models, blocks

RatioPresentationIndexPage = wagtail_utils.WagtailPageType(
    model=models.PresentationIndexPage,
    db_fields=['title'],
    extra_fields=lambda: {'presentations': presentations_field()},
)


def presentations_field():
    def resolve(obj, info):
        qs = models.PresentationPage.objects.all().live()
        qs = filter_queryset_by_page_permissions(info.context, qs)
        # TODO - filter by site for parity with `wagtailPage` GraphQL query
        return list(qs)

    return g.Field(g.NNList(RatioPresentationPage), resolve=resolve)


RatioPresentationPage = wagtail_utils.WagtailPageType(
    model=models.PresentationPage,
    db_fields=['title', 'source'],
    extra_fields={'slides': g.NNList(WagtailBlock)},
)

slides_block_types = [WagtailBlockType(block) for block in blocks.slides_blocks]

exported_types = [
    RatioPresentationIndexPage,
    RatioPresentationPage,
    *slides_block_types,
]
