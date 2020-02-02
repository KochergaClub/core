from telethon import TelegramClient
from telethon.sessions import StringSession

import os.path

from django.conf import settings

from .models import Auth

API_ID = settings.KOCHERGA_TELEGRAM['core_api']['api_id']
API_HASH = settings.KOCHERGA_TELEGRAM['core_api']['api_hash']
# SESSION = os.path.join(settings.DATA_DIR, 'telegram_core_api.session')


async def get_client():
    auth = Auth.load()
    client = TelegramClient(StringSession(auth.token), API_ID, API_HASH)
    await client.start()

    token = client.session.save()
    if auth.token != token:
        auth.token = token
        auth.save()

    return client
