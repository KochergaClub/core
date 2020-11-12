from io import BytesIO

import requests
import wagtail.images.permissions
from kocherga.graphql import g, helpers

from ..utils import create_image_from_fh
from . import types

c = helpers.Collection()


@c.class_field
class wagtailUploadImageFromUrl(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        # TODO - move to permissions
        if not wagtail.images.permissions.permission_policy.user_has_permission(
            info.context.user, 'add'
        ):
            raise Exception("Permission denied")

        url = input["url"]
        r = requests.get(url)
        r.raise_for_status()

        fh = BytesIO(r.content)

        image = create_image_from_fh(
            fh,
            title=input["title"],
            basename=input["basename"],
        )
        return {
            'image': image,
        }

    permissions = []
    input = {
        'url': str,
        'title': str,
        'basename': str,
        'collection_id': str,
        # TODO - collection, tags
    }
    result = {
        'image': g.NN(types.WagtailImage),
    }


mutations = c.as_dict()
