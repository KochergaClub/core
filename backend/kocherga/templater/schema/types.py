from typing import Optional

from kocherga.graphql import g


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


# type ImageTemplateSchema {
#   fields: [ImageTemplateSchemaField!]!
# }
ImageTemplateSchema = g.ObjectType(
    'ImageTemplateSchema',
    lambda: g.fields({'fields': g.NNList(ImageTemplateSchemaField)}),
)

# type ImageTemplateSchemaField {
#   name: String!
#   value_type: String!
#   default: String
# }
ImageTemplateSchemaField = g.ObjectType(
    'ImageTemplateSchemaField',
    g.fields({'name': str, 'value_type': str, 'default': Optional[str]}),
)

# type ImageTemplateSizes {
#   width: Int!
#   height: Int!
# }
ImageTemplateSizes = g.ObjectType(
    'ImageTemplateSizes', g.fields({'width': int, 'height': int})
)
