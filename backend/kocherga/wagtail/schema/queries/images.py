from kocherga.graphql import g, helpers

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


# unused for now, will be used in ImageEditor later
@c.class_field
class wagtailImageSearch(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        images = wagtail.images.permissions.permission_policy.instances_user_has_any_permission_for(
            info.context.user, ['change', 'delete']
        ).order_by(
            '-created_at'
        )

        query = input['query']
        images = images.search(query)
        return {
            'results': list(images),
        }

    permissions = []
    input = {
        'query': str,
    }
    result = {
        'results': g.NNList(types.WagtailImage),
        # 'more': bool, # TODO
    }


queries = c.as_dict()
