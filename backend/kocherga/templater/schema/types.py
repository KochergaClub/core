from typing import Optional

from kocherga.graphql import g

from ..config import ValueType

ImageTemplate = g.ObjectType(
    'ImageTemplate',
    fields=lambda: g.fields(
        {
            'name': 'ID!',
            'schema': g.NN(ImageTemplateSchema),
            'sizes': g.Field(g.NN(ImageTemplateSizes), resolve=resolve_sizes),
        }
    ),
)


def resolve_sizes(obj, info):
    (width, height) = obj.sizes
    return {
        "width": width,
        "height": height,
    }


ImageTemplateSchema = g.ObjectType(
    'ImageTemplateSchema',
    lambda: g.fields({'fields': g.NNList(ImageTemplateSchemaField)}),
)


def resolve_value_type_string(obj, info):
    if obj.value_type == ValueType.STRING:
        return 'str'
    elif obj.value_type == ValueType.INT:
        return 'int'
    elif obj.value_type == ValueType.FLOAT:
        return 'number'
    elif obj.value_type == ValueType.DATE:
        return 'date'
    else:
        raise Exception("Unknown value type")


ImageTemplateValueType = g.EnumType('ImageTemplateValueType', ValueType)

ImageTemplateSchemaField = g.ObjectType(
    'ImageTemplateSchemaField',
    g.fields(
        {
            'name': str,
            'value_type': g.Field(
                g.NN(g.String),
                resolve=resolve_value_type_string,
                deprecation_reason='Use `type` enum field instead',
            ),
            'type': g.Field(
                g.NN(ImageTemplateValueType),
                resolve=lambda obj, info: obj.value_type.value,
            ),
            'default': Optional[str],
        }
    ),
)

ImageTemplateSizes = g.ObjectType(
    'ImageTemplateSizes',
    g.fields(
        {
            'width': int,
            'height': int,
        }
    ),
)
