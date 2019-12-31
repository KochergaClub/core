from ariadne import QueryType

from kocherga.django.schema_utils import require_staff

from .. import models

Query = QueryType()


@Query.field('imageTemplatesAll')
@require_staff
def resolve_image_templates_all(_, info):
    names = models.list_templates()
    return [
        models.Template.by_name(name)
        for name in names
    ]


@Query.field('imageTemplateBySlug')
@require_staff
def resolve_image_template_by_slug(_, info, slug):
    return models.Template.by_name(slug)
