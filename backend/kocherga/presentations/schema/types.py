from kocherga.wagtail import graphql_utils as wagtail_utils
from kocherga.wagtail.graphql_utils import WagtailBlockType
from kocherga.wagtail.schema.types import WagtailBlock
from kocherga.graphql import g

from .. import models, blocks


PresentationPage = wagtail_utils.WagtailPageType(
    model=models.PresentationPage,
    db_fields=['title'],
    extra_fields={'slides': g.NNList(WagtailBlock)},
)

slide_block_types = [WagtailBlockType(block) for block in blocks.slide_blocks]

exported_types = [
    PresentationPage,
    *slide_block_types,
]
