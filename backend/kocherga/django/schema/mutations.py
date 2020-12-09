from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import superuseronly
from wagtail.core import models as wagtail_models

from .. import models
from . import types

c = helpers.Collection()

# TODO - derive from models.Settings?
COLLECTION_FIELDS = [
    'default_events_images_collection',
    'default_events_vk_images_collection',
    'weekly_digest_images_collection',
    'telegram_images_collection',
]


@c.class_field
class updateSettings(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        settings = models.Settings.load()

        for field in COLLECTION_FIELDS:
            collection_id = input.get(field)
            assert models.Settings._meta.get_field(field)
            if collection_id:
                # note that we're in superuser-only field, so we don't need to check collection permissions
                collection = wagtail_models.Collection.objects.get(pk=collection_id)
                setattr(settings, field, collection)

        from kocherga.telegram import models as telegram_models

        community_org_team_telegram_chat_id = input.get(
            'community_org_team_telegram_chat'
        )
        if community_org_team_telegram_chat_id:
            chat = telegram_models.Chat.objects.get(
                pk=community_org_team_telegram_chat_id
            )
            settings.community_org_team_telegram_chat = chat

        settings.full_clean()
        settings.save()

        return settings

    permissions = [superuseronly]

    input = {
        f: 'ID'
        for f in [
            'default_events_images_collection',
            'default_events_vk_images_collection',
            'weekly_digest_images_collection',
            'community_org_team_telegram_chat',
        ]
    }
    result = g.NN(types.Settings)


mutations = c.as_dict()
