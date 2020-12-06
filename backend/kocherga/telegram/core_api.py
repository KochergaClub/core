from asgiref.sync import sync_to_async
from django.conf import settings
from telethon import TelegramClient
from telethon.sessions import StringSession

from .models import Auth

API_ID = settings.KOCHERGA_TELEGRAM['core_api']['api_id']
API_HASH = settings.KOCHERGA_TELEGRAM['core_api']['api_hash']


async def get_client():
    token = await sync_to_async(lambda: Auth.load().token)()
    client = TelegramClient(StringSession(token), API_ID, API_HASH)
    await client.start()

    new_token = client.session.save()
    if new_token != token:

        def update_token():
            auth = Auth.load()
            auth.token = new_token
            auth.save()

        await sync_to_async(update_token)()

    return client
