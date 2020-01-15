from ariadne import QueryType
from .. import models

Query = QueryType()


@Query.field('staffMembersAll')
def resolve_staff_members_all(_, info):
    return models.Member.objects.all()


@Query.field('staffMember')
def resolve_staff_member(_, info, id):
    return models.Member.objects.get(pk=id)
