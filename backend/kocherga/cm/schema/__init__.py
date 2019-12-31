from ariadne import QueryType

from ..tools import now_stats_cached

Query = QueryType()


@Query.field('now')
def resolve_now(_, info):
    return now_stats_cached()


types = [Query]
