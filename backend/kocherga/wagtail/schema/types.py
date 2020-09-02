from typing import Optional

import wagtail.core.blocks
import wagtail.images.blocks
import kocherga.wagtail.blocks

from kocherga.graphql import g


# WagtailPage
def resolve_WagtailPage_type(page, *_):
    page_class = page.specific_class
    if not hasattr(page_class, 'graphql_type'):
        raise Exception("Page model is missing `graphql_type` property")
    return page_class.graphql_type


# WagtailPageMeta
WagtailPageMeta = g.ObjectType(
    'WagtailPageMeta',
    g.fields(
        {
            'slug': str,
            'html_url': str,
            'permissions': g.NN(
                g.ObjectType('WagtailPagePermissions', g.fields({'can_edit': bool}))
            ),
        }
    ),
)


def resolve_WagtailPage_meta(page, info):
    return {
        'slug': page.slug,
        'html_url': page.url,
        'permissions': {
            'can_edit': page.permissions_for_user(info.context.user).can_edit(),
        },
    }


WagtailPage = g.InterfaceType(
    'WagtailPage',
    g.fields(
        {
            'id': 'ID!',
            'title': str,
            'meta': g.Field(g.NN(WagtailPageMeta), resolve=resolve_WagtailPage_meta),
        }
    ),
    resolve_type=resolve_WagtailPage_type,
)


# WagtailImage
WagtailImage = g.ObjectType(
    'WagtailImage', g.fields({'id': 'ID!', 'url': str, 'width': int, 'height': int})
)

# WagtailImageRendition
WagtailImageRendition = g.ObjectType(
    'WagtailImageRendition',
    g.fields(
        {
            'id': 'ID!',
            'url': str,
            'width': int,
            'height': int,
            'original_image': g.Field(
                g.NN(WagtailImage),
                # TODO - require permissions?
                resolve=lambda r, info: r.image,
            ),
        }
    ),
)


# WagtailBlock
def resolve_WagtailBlock_type(obj, *_):
    # Naming type by convention.
    # Example: type='grey' -> GreyWagtailBlock
    camel_name = ''.join([part.capitalize() for part in obj.block.name.split('_')])
    return camel_name + 'Block'


WagtailBlock = g.InterfaceType(
    'WagtailBlock',
    g.fields(
        {
            'id': 'ID!',
            # Note that there's no `type` field;
            # there's no point in duplicating it since it can be restored from GraphQL's __typename.
        }
    ),
    resolve_type=resolve_WagtailBlock_type,
)


# WagtailGeo
WagtailGeo = g.ObjectType('WagtailGeo', g.fields({'lat': str, 'lng': str}))


# block validation errors

## TODO:
# interface BlockError {
#   message: String!
# }

# type ListErrorWrapper {
#   block_id: Int!
#   error: BlockError!
# }

# type ListBlockError implements BlockError {
#   block_errors: [BlockError!]!
# }

# type StructErrorWrapper {
#   field: String!
#   error: BlockError!
# }

# type StructBlockError implements BlockError {
#   block_errors: [StructErrorWrapper!]!
# }

WagtailBlockValidationError = g.ObjectType(
    'WagtailBlockValidationError', g.fields({'block_id': int, 'error_message': str})
)


def build_WagtailStreamFieldValidationError():
    from django.forms.utils import ErrorList

    def resolve_block_errors(obj, info):
        result = []
        for k, v in obj['params'].items():
            assert isinstance(v, ErrorList)
            if k == '__all__':
                continue  # non-block error
            error = v.data[0]
            result.append({'block_id': k, 'error_message': repr(vars(error))})
        return result

    return g.ObjectType(
        'WagtailStreamFieldValidationError',
        g.fields(
            {
                'block_errors': g.Field(
                    g.NNList(WagtailBlockValidationError), resolve=resolve_block_errors
                ),
                'non_block_error': g.Field(
                    g.String,
                    resolve=lambda obj, info: str(obj['params'].get('__all__')),
                ),
            }
        ),
    )


WagtailStreamFieldValidationError = build_WagtailStreamFieldValidationError()


# block structure types
common_structure_fields = {'label': str, 'group': Optional[str]}

BASIC_TYPES = ['Char', 'RichText', 'Boolean', 'Static']


def resolve_BlockStructure_type(obj, *_):
    if isinstance(obj, wagtail.core.blocks.StructBlock):
        return 'WagtailStructBlockStructure'

    if isinstance(obj, wagtail.core.blocks.ListBlock):
        return 'WagtailListBlockStructure'

    if isinstance(obj, wagtail.images.blocks.ImageChooserBlock):
        return 'WagtailImageBlockStructure'

    if isinstance(obj, kocherga.wagtail.blocks.URLOrAbsolutePathBlock):
        return 'WagtailURLBlockStructure'

    for basic_type in BASIC_TYPES:
        cls = getattr(wagtail.core.blocks, basic_type + 'Block')
        if isinstance(obj, cls):
            return f'Wagtail{basic_type}BlockStructure'

    raise Exception(f"Unknown block {obj}")


BlockStructure = g.InterfaceType(
    'WagtailBlockStructure',
    fields=g.fields(common_structure_fields),
    resolve_type=resolve_BlockStructure_type,
)

StructBlockChildStructure = g.ObjectType(
    'WagtailStructBlockChildStructure',
    fields=lambda: g.fields({'name': str, 'definition': g.NN(BlockStructure)}),
)

StructBlockStructure = g.ObjectType(
    'WagtailStructBlockStructure',
    interfaces=[BlockStructure],
    fields=g.fields(
        {
            **common_structure_fields,
            'child_blocks': g.Field(
                g.NNList(StructBlockChildStructure),
                resolve=lambda obj, info: [
                    {'name': name, 'definition': block}
                    for name, block in obj.child_blocks.items()
                ],
            ),
        }
    ),
)


ListBlockStructure = g.ObjectType(
    'WagtailListBlockStructure',
    interfaces=[BlockStructure],
    fields=g.fields({**common_structure_fields, 'child_block': g.NN(BlockStructure)}),
)


def create_basic_structure(subname: str):
    return g.ObjectType(
        f'Wagtail{subname}BlockStructure',
        interfaces=[BlockStructure],
        fields=g.fields(common_structure_fields),
    )


exported_types = [StructBlockStructure, ListBlockStructure] + [
    create_basic_structure(subname) for subname in BASIC_TYPES + ['Image', 'URL']
]
