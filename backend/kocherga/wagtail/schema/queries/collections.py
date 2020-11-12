from kocherga.graphql import g, helpers
from wagtail.core.permission_policies.collections import CollectionPermissionPolicy
from wagtail.images.models import Image

from .. import types

c = helpers.Collection()


@c.class_field
class wagtailCollectionsForImageUpload(helpers.BaseField):
    def resolve(self, _, info, filter=None):
        return CollectionPermissionPolicy(Image).collections_user_has_permission_for(
            info.context.user, 'add'
        )

    permissions = []

    result = g.NNList(types.WagtailCollection)


queries = c.as_dict()
