import json
import wagtail.core.fields

from kocherga.graphql import g, helpers

from ...blocks import registry as blocks_registry
from ..types import (
    BlockStructure,
    BlockStructureWithName,
    WagtailBlock,
    WagtailStreamFieldValidationError,
)

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


@c.class_field
class wagtailAllBlockStructures(helpers.BaseField):
    def resolve(self, _, info):
        return [
            {'name': pair[0], 'structure': pair[1]} for pair in blocks_registry.all()
        ]

    permissions = []

    result = g.NNList(BlockStructureWithName)


@c.class_field
class wagtailRenderBlock(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        name = input['type']
        stream_block = wagtail.core.fields.StreamField(
            [
                (name, blocks_registry.by_name(name))
            ]  # TODO - skip private blocks which could leak important data
        ).stream_block
        params = json.loads(input['paramsJson'])

        from wagtail.core.blocks.stream_block import StreamBlockValidationError

        try:
            result = stream_block.clean(
                stream_block.to_python([{'type': name, 'value': params}])
            )
        except StreamBlockValidationError as e:
            return {'validation_error': {'params': e.params}}

        assert len(result) == 1

        # copy-pasted from events/models/event.py
        import base64
        import uuid

        def generate_uuid():
            return base64.b32encode(uuid.uuid4().bytes)[:26].lower().decode('ascii')

        result[
            0
        ].id = (
            generate_uuid()
        )  # uuid so that we don't confuse frontend with identical objects
        return {'block': result[0]}

    permissions = []
    input = {
        'type': str,
        'paramsJson': str,
    }
    result = {
        'validation_error': WagtailStreamFieldValidationError,
        'block': WagtailBlock,
    }


queries = c.as_dict()
