import logging

logger = logging.getLogger(__name__)

from typing import Optional

import kocherga.wagtail.blocks
import wagtail.core.blocks
import wagtail.images.blocks
from django.forms.utils import ErrorList
from kocherga.graphql import g


# WagtailPage
def resolve_WagtailPage_type(page, *_):
    page_class = page.specific_class
    if not hasattr(page_class, 'graphql_type'):
        raise Exception("Page model is missing `graphql_type` property")
    return page_class.graphql_type


def build_WagtailPageMeta():
    def _can_edit(page, user):
        return page.permissions_for_user(user).can_edit()

    def resolve_permissions(page, info):
        return {'can_edit': _can_edit(page, info.context.user)}

    WagtailPageRevision = g.ObjectType(
        'WagtailPageRevision',
        fields=lambda: g.fields(
            {
                'id': 'ID!',
                'created_at': str,
                'as_page': g.Field(
                    g.NN(WagtailPage), resolve=lambda obj, info: obj.as_page_object()
                ),
            }
        ),
    )

    def resolve_revisions(page, info):
        if not _can_edit(page, info.context.user):
            raise Exception("Can't get revisions without can_edit permission")
        return list(page.revisions.all())

    def resolve_single_revision(page, info, id):
        if not _can_edit(page, info.context.user):
            raise Exception("Can't get revisions without can_edit permission")
        return page.revisions.get(pk=id)

    return g.ObjectType(
        'WagtailPageMeta',
        g.fields(
            {
                'slug': str,
                'description': g.Field(
                    g.NN(g.String), resolve=lambda page, info: page.search_description
                ),
                'html_url': g.Field(
                    g.NN(g.String),
                    resolve=lambda page, info: page.url,
                    deprecation_reason='renamed to `url`',
                ),
                'url': str,
                'permissions': g.Field(
                    g.NN(
                        g.ObjectType(
                            'WagtailPagePermissions', g.fields({'can_edit': bool})
                        )
                    ),
                    resolve=resolve_permissions,
                ),
                # 'live_revision_id': 'ID',  # can be null if page is not published yet
                'revisions': g.Field(
                    g.NNList(WagtailPageRevision),
                    resolve=resolve_revisions,
                ),
                'revision': g.Field(
                    g.NN(WagtailPageRevision),
                    args=g.arguments({'id': 'ID!'}),
                    resolve=resolve_single_revision,
                ),
            }
        ),
    )


WagtailPageMeta = build_WagtailPageMeta()


def resolve_WagtailPage_meta(page, info):
    return page


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
def build_WagtailImage():
    def resolve_rendition(obj, info, spec):
        return obj.get_rendition(spec)

    return g.ObjectType(
        'WagtailImage',
        lambda: g.fields(
            {
                'id': 'ID!',
                'url': str,
                'width': int,
                'height': int,
                'rendition': g.Field(
                    g.NN(WagtailImageRendition),
                    args=g.arguments({'spec': str}),
                    resolve=resolve_rendition,
                ),
            }
        ),
    )


WagtailImage = build_WagtailImage()

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

# Used in audit methods for permissions listing.
# Alsow used for images uploading, so not very private.
# Don't add `images` field or something without thinking through the consequences!
WagtailCollection = g.ObjectType(
    'WagtailCollection',
    g.fields(
        {
            'id': 'ID!',
            'name': str,
        }
    ),
)


# block validation errors


def resolve_WagtailBlockValidationError_type(value, *_):
    if not isinstance(value, ErrorList):
        raise Exception(f"Expected ErrorList, got: {value}, type {type(value)}")
    err = value.data[0]
    if not isinstance(err, Exception):
        raise Exception(
            f"Weird, expected exception in ErrorList, got {err}, type {type(err)}"
        )

    message = getattr(err, 'message', None)

    if message == 'Validation error in StructBlock':
        return 'WagtailStructBlockValidationError'
    elif message == 'Validation error in ListBlock':
        return 'WagtailListBlockValidationError'
    else:
        return 'WagtailAnyBlockValidationError'


valdiation_error_message_field = g.Field(
    g.NN(g.String), resolve=lambda obj, info: repr(vars(obj.data[0]))
)


WagtailBlockValidationError = g.InterfaceType(
    'WagtailBlockValidationError',
    fields=g.fields({'error_message': valdiation_error_message_field}),
    resolve_type=resolve_WagtailBlockValidationError_type,
)


def build_ListBlockValidationError():
    def resolve_errors(obj, info):
        return obj.data[0].params

    return g.ObjectType(
        'WagtailListBlockValidationError',
        fields=lambda: g.fields(
            {
                'error_message': valdiation_error_message_field,
                'errors': g.Field(
                    g.NN(g.List(WagtailBlockValidationError)),
                    resolve=resolve_errors,
                ),
            }
        ),
        interfaces=[WagtailBlockValidationError],
    )


WagtailListBlockValidationError = build_ListBlockValidationError()


def build_StructBlockValidationError():
    FieldValidationError = g.ObjectType(
        'WagtailStructBlockFieldValidationError',
        fields=lambda: g.fields({'name': str, 'error': WagtailBlockValidationError}),
    )

    return g.ObjectType(
        'WagtailStructBlockValidationError',
        fields=lambda: g.fields(
            {
                'error_message': valdiation_error_message_field,
                'errors': g.Field(
                    g.NNList(FieldValidationError),
                    resolve=lambda obj, info: [
                        {'name': k, 'error': v} for k, v in obj.data[0].params.items()
                    ],
                ),
            }
        ),
        interfaces=[WagtailBlockValidationError],
    )


WagtailStructBlockValidationError = build_StructBlockValidationError()


def build_AnyBlockValidationError():
    return g.ObjectType(
        'WagtailAnyBlockValidationError',
        fields=lambda: g.fields(
            {
                'error_message': g.Field(
                    g.NN(g.String),
                    resolve=lambda obj, info: getattr(
                        obj.data[0], 'message', str(obj.data[0])
                    ),
                ),
            }
        ),
        interfaces=[WagtailBlockValidationError],
    )


WagtailAnyBlockValidationError = build_AnyBlockValidationError()


WagtailStreamBlockValidationError = g.ObjectType(
    'WagtailStreamBlockValidationError',
    g.fields({'block_id': int, 'error': WagtailBlockValidationError}),
)


def build_WagtailStreamFieldValidationError():
    def resolve_block_errors(obj, info):
        result = []
        for k, v in obj['params'].items():
            assert isinstance(v, ErrorList)
            if k == '__all__':
                continue  # non-block error
            result.append({'block_id': k, 'error': v})
        return result

    def resolve_non_block_error(obj, info):
        error = obj['params'].get('__all__')
        if error is None:
            return None
        return str(error)

    return g.ObjectType(
        'WagtailStreamFieldValidationError',
        g.fields(
            {
                'block_errors': g.Field(
                    g.NNList(WagtailStreamBlockValidationError),
                    resolve=resolve_block_errors,
                ),
                'non_block_error': g.Field(g.String, resolve=resolve_non_block_error),
            }
        ),
    )


WagtailStreamFieldValidationError = build_WagtailStreamFieldValidationError()


# block structure types
common_structure_fields = {
    'label': str,
    'group': Optional[str],
    'required': bool,
}

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


exported_types = (
    [StructBlockStructure, ListBlockStructure]
    + [create_basic_structure(subname) for subname in BASIC_TYPES + ['Image', 'URL']]
    + [
        WagtailStructBlockValidationError,
        WagtailListBlockValidationError,
        WagtailAnyBlockValidationError,
    ]
)
