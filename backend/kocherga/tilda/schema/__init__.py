from ariadne import QueryType

from .types import types

from .. import models

Query = QueryType()


@Query.field('tildaPage')
def resolve_tildaPage(_, info, path):
    try:
        return models.TildaPage.objects.get(path=path)
    except models.TildaPage.DoesNotExist:
        return None


@Query.field('tildaPages')
def resolve_tildaPagePaths(_, info):
    return list(models.TildaPage.objects.all())


types = [Query, *types]
