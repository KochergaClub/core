from kocherga.graphql import helpers

import wagtail.images.permissions

from .. import types
from ... import models

c = helpers.Collection()


@c.class_field
class wagtailImage(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        id = input['id']

        image = models.CustomImage.objects.get(pk=id)

        if not wagtail.images.permissions.permission_policy.user_has_permission_for_instance(
            info.context.user, 'change', image
        ):
            raise Exception("Permission denied")

        return image

    permissions = []  # permissions are checked inside resolve method
    input = {
        'id': 'ID!',
    }
    result = types.WagtailImage


queries = c.as_dict()
