from kocherga.graphql import g
from kocherga.wagtail.graphql_utils import WagtailPageType, block_to_types
from kocherga.wagtail.schema.types import WagtailBlock

from ... import models, blocks

RatioSectionIndexPage = WagtailPageType(models.SectionIndexPage, db_fields=['title'])

RatioSectionPage = WagtailPageType(
    models.SectionPage,
    db_fields=['title'],
    extra_fields={'body': g.NNList(WagtailBlock)},
)

RatioNotebookIndexPage = WagtailPageType(models.NotebookIndexPage, db_fields=['title'])

# type RatioNotebookPage implements WagtailPage {
#   id: ID!
#   meta: WagtailPageMeta!
#   title: String!
#   sections: [RatioNotebookSectionBlock!]!
# }
RatioNotebookPage = WagtailPageType(
    models.NotebookPage,
    db_fields=['title'],
    extra_fields=lambda: g.fields({'sections': g.NNList(RatioNotebookSectionBlock)}),
)

block_types = [
    t
    for block in [*blocks.notebook_blocks, *blocks.section_blocks]
    for t in block_to_types(
        block, types_for_page_chooser={'RatioSectionPage': RatioSectionPage}
    )
]

# used in RatioNotebookPage above
RatioNotebookSectionBlock = next(
    block for block in block_types if block.name == 'RatioNotebookSectionBlock'
)

exported_types = [
    RatioSectionPage,
    RatioSectionIndexPage,
    RatioNotebookPage,
    RatioNotebookIndexPage,
    *block_types,
]
