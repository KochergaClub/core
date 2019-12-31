from ariadne import QueryType

from django.contrib.auth import models as auth_models
from kocherga.django.schema_utils import require_permission

Query = QueryType()


@Query.field("currentUser")
def resolve_current_user(_, info):
    return info.context.user


@Query.field("authGroupsAll")
@require_permission('auth.audit')
def resolve_auth_groups_all(_, info):
    return auth_models.Group.objects.all()


@Query.field("authPermissionsAll")
@require_permission('auth.audit')
def resolve_auth_permissions_all(_, info):
    return auth_models.Permission.objects.all()
