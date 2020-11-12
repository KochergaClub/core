import logging
from io import BytesIO

from kocherga.wagtail.utils import create_image_from_fh

logger = logging.getLogger(__name__)

import kocherga.importer.base
from kocherga.django.models import Settings

from . import api, models


class Importer(kocherga.importer.base.FullImporter):
    def do_full_import(self):
        for obj in models.Chat.objects.all():
            response = api.api_call('getChat', {'chat_id': '@' + obj.username})
            obj.title = response['result']['title']
            chat_photo = response['result'].get('photo', None)
            if chat_photo:
                photo = api.api_call('getFile', {'file_id': chat_photo['big_file_id']})

                photo_file_id = photo['result']['file_unique_id']
                if photo_file_id != obj.photo_file_id:
                    logger.info(repr(photo['result']))
                    photo_bytes = api.get_file(photo['result']['file_path'])
                    obj.photo_file_id = photo_file_id
                    obj.photo = create_image_from_fh(
                        BytesIO(photo_bytes),
                        title=f'Telegram chat photo for {obj.username}',
                        basename=f'telegram-chat-photo-{photo_file_id}',
                        user=None,
                        collection=Settings.load().telegram_images_collection,
                    )
                else:
                    logger.info(
                        f"Photo for {obj.username} is already in local database"
                    )

            obj.save()
