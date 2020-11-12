from io import BytesIO

import requests
import wagtail.core.models
import wagtail.images.permissions
from kocherga.graphql import g, helpers

from ..utils import check_add_image_permissions_for_collection, create_image_from_fh
from . import types

c = helpers.Collection()


@c.class_field
class wagtailUploadImageFromUrl(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        collection = wagtail.core.models.Collection.objects.get(
            pk=input['collection_id']
        )
        check_add_image_permissions_for_collection(info.context.user, collection)

        url = input["url"]
        r = requests.get(url)
        r.raise_for_status()

        fh = BytesIO(r.content)

        image = create_image_from_fh(
            fh,
            title=input["title"],
            basename=input["basename"],
            user=info.context.user,
            collection=collection,
            check_permission=False,
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
        # TODO - tags
    }
    result = {
        'image': g.NN(types.WagtailImage),
    }


mutations = c.as_dict()
