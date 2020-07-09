from kocherga.graphql import g
from kocherga.wagtail.graphql_utils import WagtailPageType, WagtailBlockType
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

# type RatioNotebookSectionBlock implements WagtailBlock {
#   id: ID!
#   value: RatioSectionPage!
# }
assert len(blocks.notebook_blocks) == 1
assert blocks.notebook_blocks[0][0] == 'ratio_notebook_section'
RatioNotebookSectionBlock = WagtailBlockType(
    blocks.notebook_blocks[0],
    types_for_page_chooser={'RatioSectionPage': RatioSectionPage},
)

section_block_types = [WagtailBlockType(block) for block in blocks.section_blocks]

exported_types = [
    RatioSectionPage,
    RatioSectionIndexPage,
    RatioNotebookPage,
    RatioNotebookIndexPage,
    RatioNotebookSectionBlock,
    *section_block_types,
]
