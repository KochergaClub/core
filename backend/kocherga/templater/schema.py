import graphene

from kocherga.django.schema_utils import require_staff, NNList

from . import models


class ImageTemplateSchemaField(graphene.ObjectType):
    name = graphene.String(required=True)
    value_type = graphene.String(required=True)
    default = graphene.String()


class ImageTemplateSchema(graphene.ObjectType):
    fields = NNList(ImageTemplateSchemaField)


class ImageTemplateSizes(graphene.ObjectType):
    width = graphene.Int(required=True)
    height = graphene.Int(required=True)


class ImageTemplate(graphene.ObjectType):
    name = graphene.ID(required=True)

    def resolve_name(self, info):
        return self.name

    schema = graphene.Field(ImageTemplateSchema, required=True)

    def resolve_schema(self, info):
        return self.schema.to_dict()

    sizes = graphene.Field(ImageTemplateSizes, required=True)

    def resolve_sizes(self, info):
        (width, height) = self.sizes
        return {
            'width': width,
            'height': height,
        }


class Query:
    imageTemplatesAll = NNList(ImageTemplate)

    @require_staff
    def resolve_imageTemplatesAll(self, info):
        names = models.list_templates()
        return [
            models.Template.by_name(name)
            for name in names
        ]

    imageTemplateBySlug = graphene.Field(graphene.NonNull(ImageTemplate), slug=graphene.String(required=True))

    @require_staff
    def resolve_imageTemplateBySlug(self, info, slug):
        return models.Template.by_name(slug)


class Mutation:
    pass
