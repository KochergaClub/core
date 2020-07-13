from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import check_permissions, user_perm
from . import types

from django.contrib.auth import models as auth_models


c = helpers.Collection()


@c.field
def authGroupsAll(helper):
    @check_permissions([user_perm("auth.audit")])
    def resolve(_, info):
        return auth_models.Group.objects.all()

    Result = g.NNList(types.AuthGroup)

    return g.Field(Result, resolve=resolve)


@c.field
def authPermissionsAll(helper):
    @check_permissions([user_perm("auth.audit")])
    def resolve(_, info):
        return auth_models.Permission.objects.all()

    Result = g.NNList(types.AuthPermission)

    return g.Field(Result, resolve=resolve)


queries = c.as_dict()
