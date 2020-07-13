from kocherga.graphql.helpers import Collection
from kocherga.graphql import g

from kocherga.wagtail.utils import filter_queryset_by_page_permissions
from .. import models

from .types import ProjectPage

c = Collection()


# projects: [ProjectPage!]!
@c.field
def projects(_):
    def resolve(_, info):
        qs = models.ProjectPage.objects.all().live()
        qs = filter_queryset_by_page_permissions(info.context, qs)
        return list(qs)

    return g.Field(g.NNList(ProjectPage), resolve=resolve)


queries = c.as_dict()
