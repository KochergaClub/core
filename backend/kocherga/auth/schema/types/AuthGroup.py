from django.contrib.auth import models as auth_models
from kocherga.graphql import django_utils, g, helpers
from kocherga.wagtail.schema import types as wagtail_types

from .AuthPermission import AuthPermission
from .AuthUser import AuthUser

c = helpers.Collection()


@c.class_field
class wagtailCollectionPermissions(helpers.BaseField):
    WagtailCollectionPermission = g.ObjectType(
        'WagtailCollectionPermission',
        fields=g.fields(
            {
                'id': 'ID!',
                'permission': g.NN(AuthPermission),
                'collection': g.NN(wagtail_types.WagtailCollection),
            }
        ),
    )

    permissions = []

    def resolve(self, group, info):
        return group.collection_permissions.all()

    result = g.NNList(WagtailCollectionPermission)


@c.class_field
class wagtailPagePermissions(helpers.BaseField):
    # TODO - enum? PAGE_PERMISSION_TYPES is a constant in wagtail
    _permission_type = g.NN(g.String)

    WagtailSpecificPagePermission = g.ObjectType(
        'WagtailSpecificPagePermission',
        fields=g.fields(
            {
                'id': 'ID!',
                'permission_type': _permission_type,
                'page': g.NN(wagtail_types.WagtailPage),
            }
        ),
    )

    WagtailRootPagePermission = g.ObjectType(
        'WagtailRootPagePermission',
        fields=g.fields(
            {
                'id': 'ID!',
                'permission_type': _permission_type,
            }
        ),
    )

    # TODO - interface instead of union? would be better for querying
    WagtailPagePermission = g.UnionType(
        'WagtailPagePermission',
        types=[WagtailRootPagePermission, WagtailSpecificPagePermission],
        resolve_type=lambda obj, info, *_: (
            'WagtailRootPagePermission'
            if obj.page.is_root()
            else 'WagtailSpecificPagePermission'
        ),
    )

    # AuthGroup is very private so we don't need additional checks here
    permissions = []

    def resolve(self, group, info):
        return group.page_permissions.all()

    result = g.NNList(WagtailPagePermission)


AuthGroup = django_utils.DjangoObjectType(
    'AuthGroup',
    model=auth_models.Group,
    db_fields=[
        'id',
        'name',
    ],
    related_fields={
        'permissions': AuthPermission,
    },
    extra_fields={
        'users': g.Field(
            g.NNList(AuthUser), resolve=lambda obj, info: obj.user_set.all()
        ),
        **c.as_dict(),
    },
)
