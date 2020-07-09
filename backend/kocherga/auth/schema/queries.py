from kocherga.graphql import g
from kocherga.graphql.helpers import Collection
from kocherga.graphql.decorators import auth
from . import types

from django.contrib.auth import models as auth_models


c = Collection()


@c.field
def authGroupsAll(helper):
    @auth(permission="auth.audit")
    def resolve(_, info):
        return auth_models.Group.objects.all()

    Result = g.NNList(types.AuthGroup)

    return g.Field(Result, resolve=resolve)


@c.field
def authPermissionsAll(helper):
    @auth(permission="auth.audit")
    def resolve(_, info):
        return auth_models.Permission.objects.all()

    Result = g.NNList(types.AuthPermission)

    return g.Field(Result, resolve=resolve)


queries = c.as_dict()
