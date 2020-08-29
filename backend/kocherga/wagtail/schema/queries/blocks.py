from kocherga.graphql import g, helpers

from ...blocks import registry as blocks_registry
from ..types import BlockStructure

c = helpers.Collection()


@c.class_field
class wagtailBlockStructure(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        block_name = input['name']
        block = blocks_registry.by_name(block_name)
        return block

    permissions = []
    input = {
        'name': str,
    }

    result = g.NN(BlockStructure)


queries = c.as_dict()
