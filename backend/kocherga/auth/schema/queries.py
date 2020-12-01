from typing import Optional

from django.contrib.auth import models as auth_models
from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import check_permissions, user_perm
from wagtail.search.backends import get_search_backend

from .. import models
from . import types

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


@c.class_field
class searchUsers(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        query = input['query']
        if not query:
            # don't want to find anything by an empty query
            return {
                'results': [],
                'more': False,
            }

        qs = get_search_backend().search(
            query, models.User, fields=['email', 'first_name', 'last_name']
        )

        # TODO - logic copy-pasted from kocherga.wagtail.schema.queries.search, generalize
        limit = input.pop('limit', None) or 10

        # Ask for one more to determine if there are more results
        qs = qs[: limit + 1]

        results = list(qs)

        more = len(results) > limit
        results = results[:limit]

        return {
            'results': results,
            'more': more,
        }

    permissions = [user_perm('auth.audit')]
    input = {
        'query': str,
        'limit': Optional[int],
    }
    result = {
        'results': g.NNList(types.AuthUser),
        'more': bool,
    }


queries = c.as_dict()
