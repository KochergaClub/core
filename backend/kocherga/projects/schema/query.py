from ariadne import QueryType

from kocherga.wagtail.utils import filter_queryset_by_page_permissions
from .. import models

Query = QueryType()


@Query.field('projects')
def resolve_projects(self, info):
    qs = models.ProjectPage.objects.all().live()
    qs = filter_queryset_by_page_permissions(info.context, qs)
    return list(qs)
