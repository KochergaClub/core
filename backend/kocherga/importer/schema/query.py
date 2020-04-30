from ariadne import QueryType

from ..daemon import all_importers

Query = QueryType()


@Query.field('importers')
def resolve_importers(_, info):
    return all_importers()
