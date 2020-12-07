from typing import List

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import check_permissions

from .. import models
from . import types


def build_comments_field(permissions: List[helpers.PermissionType]):
    def resolve(obj, info, **pager):
        assert isinstance(obj, models.Commentable)
        return obj.comments.all()

    result = g.NNList(types.Comment)
    return g.Field(result, resolve=check_permissions(permissions)(resolve))


def build_comments_count_field(permissions: List[helpers.PermissionType]):
    def resolve(obj, info, **pager):
        assert isinstance(obj, models.Commentable)
        return obj.comments.count()

    result = g.NN(g.Int)
    return g.Field(result, resolve=check_permissions(permissions)(resolve))
