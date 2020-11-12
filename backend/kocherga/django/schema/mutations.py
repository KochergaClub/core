from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import superuseronly
from wagtail.core import models as wagtail_models

from .. import models
from . import types

c = helpers.Collection()


@c.class_field
class updateSettings(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        settings = models.Settings.load()
        images_collection_id = input.get('default_events_images_collection_id')
        if images_collection_id:
            # note that we're in superuser-only field, so we don't need to check collection permissions
            collection = wagtail_models.Collection.objects.get(pk=images_collection_id)
            settings.default_events_images_collection = collection

        vk_images_collection_id = input.get('default_events_images_vk_collection_id')
        if vk_images_collection_id:
            collection = wagtail_models.Collection.objects.get(
                pk=vk_images_collection_id
            )
            settings.default_events_vk_images_collection = collection

        settings.full_clean()
        settings.save()

        return settings

    permissions = [superuseronly]

    input = {
        'default_events_images_collection_id': 'ID',
        'default_events_vk_images_collection_id': 'ID',
    }
    result = g.NN(types.Settings)


mutations = c.as_dict()
