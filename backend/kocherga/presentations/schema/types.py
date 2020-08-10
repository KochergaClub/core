from kocherga.wagtail import graphql_utils as wagtail_utils
from kocherga.wagtail.graphql_utils import block_to_types
from kocherga.wagtail.schema.types import WagtailBlock
from kocherga.graphql import g

from .. import models, blocks


PresentationPage = wagtail_utils.WagtailPageType(
    model=models.PresentationPage,
    db_fields=['title'],
    extra_fields={'slides': g.NNList(WagtailBlock)},
)

slide_block_types = [t for block in blocks.slide_blocks for t in block_to_types(block)]

exported_types = [
    PresentationPage,
    *slide_block_types,
]
