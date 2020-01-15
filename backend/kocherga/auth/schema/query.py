from ariadne import QueryType

from django.contrib.auth import models as auth_models

Query = QueryType()


@Query.field("authGroupsAll")
def resolve_auth_groups_all(_, info):
    return auth_models.Group.objects.all()


@Query.field("authPermissionsAll")
def resolve_auth_permissions_all(_, info):
    return auth_models.Permission.objects.all()
