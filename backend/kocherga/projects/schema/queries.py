from kocherga.graphql import g, helpers
from kocherga.graphql.helpers import Collection
from kocherga.wagtail.utils import filter_queryset_by_page_permissions

from .. import models
from . import types

c = Collection()


@c.class_field
class projects(helpers.BaseField):
    def resolve(self, _, info):
        qs = models.ProjectPage.objects.all().live()
        qs = filter_queryset_by_page_permissions(info.context, qs)
        return list(qs)

    permissions = []  # not neded, projects are filtered by permissions in resolve()
    result = g.NNList(types.ProjectPage)


queries = c.as_dict()
