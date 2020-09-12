import logging

logger = logging.getLogger(__name__)

from typing import List, Dict, Union, Tuple, Any, Callable
from types import FunctionType
import graphql

import wagtail.core.rich_text
import wagtail.core.fields
import wagtail.core.models
import wagtail.core.blocks
import wagtail.images.models
import wagtailmath.blocks
import wagtailgeowidget.blocks
from wagtail.images.blocks import ImageChooserBlock

import kocherga.wagtail.blocks
import kocherga.wagtail.models
from kocherga.graphql import g, django_utils
from kocherga.graphql.permissions import check_permissions
from .schema import types


def basic_fields():
    return types.WagtailPage.fields


def richtext_field(model, field_name):
    # via https://github.com/wagtail/wagtail/issues/2695 - fixing <embed> in RichTextFields

    def resolve(obj, info):
        value = getattr(obj, field_name)
        return wagtail.core.rich_text.expand_db_html(value)

    # TODO - check that model field is nullable and don't wrap in g.NN if it's nullable?
    type_ = g.NN(g.String)

    assert isinstance(
        model._meta.get_field(field_name), wagtail.core.fields.RichTextField
    )

    return g.Field(type_, resolve=resolve)


def image_rendition_field(model, field_name, permissions: List[Any] = []):
    @check_permissions(permissions)
    def resolve(obj, info, spec):
        image = getattr(obj, field_name)
        if not image:
            return None
        return image.get_rendition(spec)

    field = model._meta.get_field(field_name)
    assert issubclass(field.related_model, wagtail.images.models.AbstractImage)

    Result = types.WagtailImageRendition
    if not field.null:
        Result = g.NN(Result)

    return g.Field(Result, args=g.arguments({'spec': str}), resolve=resolve)


def WagtailPageType(
    model: kocherga.wagtail.models.KochergaPage,
    db_fields: List[str],
    related_fields: Dict[str, Union[Tuple[str, g.ObjectType], g.ObjectType]] = {},
    extra_fields={},
):
    def extend_extra(inner_extra):
        return {**basic_fields(), **inner_extra}

    def build_extra():
        if isinstance(extra_fields, FunctionType):
            return extend_extra(extra_fields())
        else:
            return extend_extra(extra_fields)

    # TODO - because DjangoObjectType orders db_fields before extra_fields, field order for WagtailPage types is
    # awkward.
    result = django_utils.DjangoObjectType(
        model.graphql_type,
        model,
        db_fields=db_fields,
        related_fields=related_fields,
        extra_fields=build_extra,
    )
    result.interfaces = [types.WagtailPage]
    return result


def wagtail_to_graphql_block_name(name: str):
    return ''.join([part.capitalize() for part in name.split('_')]) + 'Block'


def block_to_gfield(
    name: str,
    block_type: wagtail.core.blocks.Block,
    registrator: Callable[
        [g.ObjectType], None
    ],  # registers extra block types, usually from StreamBlock
    types_for_page_chooser: Dict[str, g.ObjectType] = {},
):
    if any(
        isinstance(block_type, c)
        for c in (
            wagtail.core.blocks.CharBlock,
            wagtail.core.blocks.TextBlock,
            wagtail.core.blocks.RawHTMLBlock,
            kocherga.wagtail.blocks.URLOrAbsolutePathBlock,
            wagtailmath.blocks.MathBlock,
        )
    ):
        return str

    if isinstance(block_type, wagtail.core.blocks.IntegerBlock):
        return int

    if isinstance(block_type, wagtail.core.blocks.BooleanBlock):
        return bool

    if isinstance(block_type, wagtailgeowidget.blocks.GeoBlock):
        return g.NN(types.WagtailGeo)

    if isinstance(block_type, wagtail.core.blocks.RichTextBlock):

        def resolve_richtext_value(obj, info):
            value = graphql.default_field_resolver(obj, info)
            return wagtail.core.rich_text.expand_db_html(value.source)

        return g.Field(g.NN(g.String), resolve=resolve_richtext_value)

    if isinstance(block_type, ImageChooserBlock):

        def resolve_image_value(obj, info, spec):
            image = graphql.default_field_resolver(obj, info)
            if not image:
                return None
            return image.get_rendition(spec)

        Result = types.WagtailImageRendition
        if block_type.required:
            Result = g.NN(Result)

        return g.Field(
            Result, args=g.arguments({'spec': str}), resolve=resolve_image_value
        )

    if isinstance(block_type, wagtail.core.blocks.ListBlock):
        child_field = block_to_gfield(
            name, block_type.child_block, registrator, types_for_page_chooser
        )
        if isinstance(child_field, g.Field):
            child_type = child_field.type
            if child_field.resolve:
                # handling this case is more complicated than I expected and we don't need it for now
                raise Exception(
                    "Wrapping fields with custom resolvers in ListBLock is not implemented yet"
                )
        else:
            child_type = g.as_type(child_field)

        return g.NN(g.List(child_type))

    if isinstance(block_type, wagtail.core.blocks.StructBlock):
        return g.NN(
            g.ObjectType(
                name + 'Value',
                fields=g.fields(
                    {
                        k: block_to_gfield(
                            name + '_' + k, v, registrator, types_for_page_chooser
                        )
                        for k, v in block_type.child_blocks.items()
                    }
                ),
            )
        )

    if isinstance(block_type, wagtail.core.blocks.StreamBlock):
        nested_name_to_full_graphql_name = (
            lambda n: name + '_' + wagtail_to_graphql_block_name(k)
        )
        nested_types = []
        for k, v in block_type.child_blocks.items():
            all_nested_types = block_to_types(
                (nested_name_to_full_graphql_name(k), v),
                types_for_page_chooser,
                rewrite_name=False,
            )
            nested_types.append(all_nested_types[0])
            # for nested_type in nested_types:
            #     registrator(nested_type)

        return g.NNList(
            g.UnionType(
                name + 'Values',
                types=nested_types,
                resolve_type=lambda obj, *_: nested_name_to_full_graphql_name(
                    obj.block.name
                ),
            )
        )

    if isinstance(block_type, wagtail.core.blocks.PageChooserBlock):
        value_type = types_for_page_chooser[block_type.target_model.graphql_type]

        if block_type.required:
            value_type = g.NN(value_type)

        return value_type

    raise Exception(f"Don't know how to handle block type {block_type}")


def block_to_types(
    t: Tuple[str, wagtail.core.blocks.Block],
    types_for_page_chooser: Dict[str, g.ObjectType] = {},
    rewrite_name=True,
):
    """Converts wagtail block tuple to the list of graphql types.

    Tuple should look like `('foo_block', blocks.CharBlock())`.
    This function returns a list of types because complex wagtail blocks can include StreamBlocks which can
    define new graphql types implementing WagtailBlock interface.
    """

    (name, block_type) = t

    # false `rewrite_name` is useful in recursion from block_to_gfield
    if rewrite_name:
        name = wagtail_to_graphql_block_name(name)

    extra_types = []

    def registrator(t: g.ObjectType):
        extra_types.append(t)

    value_field = block_to_gfield(name, block_type, registrator, types_for_page_chooser)

    return [
        g.ObjectType(
            name,
            interfaces=[types.WagtailBlock],
            fields=g.fields({'id': 'ID!', 'value': value_field}),
        ),
        *extra_types,
    ]
