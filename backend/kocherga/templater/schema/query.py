from ariadne import QueryType

from .. import models

Query = QueryType()


@Query.field('imageTemplatesAll')
def resolve_image_templates_all(_, info):
    names = models.list_templates()
    return [
        models.Template.by_name(name)
        for name in names
    ]


@Query.field('imageTemplateBySlug')
def resolve_image_template_by_slug(_, info, slug):
    return models.Template.by_name(slug)
