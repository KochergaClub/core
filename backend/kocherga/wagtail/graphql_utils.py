from typing import List, Dict, Union, Tuple
from types import FunctionType

import wagtail.core.rich_text
import wagtail.core.fields
import wagtail.core.models
import wagtail.core.blocks
import wagtail.images.models
import wagtailmath.blocks
import wagtailgeowidget.blocks

import kocherga.wagtail.blocks
from kocherga.graphql import g, django_utils
from .schema import types


def basic_fields():
    return g.fields({'id': g.NN(g.ID), 'meta': g.NN(types.WagtailPageMeta)})


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


def image_rendition_field(model, field_name, decorator=lambda x: x):
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

    return g.Field(Result, args=g.arguments({'spec': str}), resolve=decorator(resolve))


def WagtailPageType(
    model: wagtail.core.models.Page,
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


def block_to_gfield(
    name: str,
    block_type: wagtail.core.blocks.Block,
    types_for_page_chooser: Dict[str, g.ObjectType] = {},
):
    if any(
        isinstance(block_type, c)
        for c in (
            wagtail.core.blocks.CharBlock,
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
            return wagtail.core.rich_text.expand_db_html(obj.value)

        return g.Field(g.NN(g.String), resolve=resolve_richtext_value)

    if isinstance(block_type, wagtail.core.blocks.ListBlock):
        child_field = block_to_gfield(
            name, block_type.child_block, types_for_page_chooser
        )
        resolve = None
        child_type = None

        # Child field can be a real field (GraphQLField, e.g. for StructBlock or RichTextBlock),
        # or it can be python type or graphql type.
        # So there are a few different cases here, please be careful.
        if isinstance(child_field, g.Field):
            child_type = child_field.type
            if child_field.resolve:
                resolve = lambda obj, info: [child_field.resolve(v, info) for v in obj]
        else:
            child_type = g.as_type(child_field)

        return g.Field(g.NN(g.List(child_type)), resolve=resolve)

    if isinstance(block_type, wagtail.core.blocks.StructBlock):
        return g.NN(
            g.ObjectType(
                name + 'Value',
                fields=g.fields(
                    {
                        k: block_to_gfield(name + '_' + k, v, types_for_page_chooser)
                        for k, v in block_type.child_blocks.items()
                    }
                ),
            )
        )

    if isinstance(block_type, wagtail.core.blocks.PageChooserBlock):
        value_type = types_for_page_chooser[block_type.target_model.graphql_type]

        if block_type.required:
            value_type = g.NN(value_type)

        return value_type

    raise Exception(f"Don't know how to handle block type {block_type}")


def WagtailBlockType(
    t: Tuple[str, wagtail.core.blocks.Block],
    types_for_page_chooser: Dict[str, g.ObjectType] = {},
):
    (name, block_type) = t
    object_name = ''.join([part.capitalize() for part in name.split('_')]) + 'Block'

    return g.ObjectType(
        object_name,
        interfaces=[types.WagtailBlock],
        fields=g.fields(
            {
                'id': 'ID!',
                'value': block_to_gfield(
                    object_name, block_type, types_for_page_chooser
                ),
            }
        ),
    )
