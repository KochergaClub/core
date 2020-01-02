from ariadne import QueryType, ObjectType

from ..tools import now_stats_cached

Query = QueryType()


@Query.field('now')
def resolve_now(_, info):
    return now_stats_cached()


My = ObjectType('My')


@My.field('membership')
def resolve_membership(_, info):
    user = info.context.user
    if not hasattr(user, 'customer'):
        return None  # not all users have CM customer, that's fine

    return user.customer
