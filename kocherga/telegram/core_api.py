from telethon import TelegramClient
import os.path

from django.conf import settings

API_ID = settings.KOCHERGA_TELEGRAM['core_api']['api_id']
API_HASH = settings.KOCHERGA_TELEGRAM['core_api']['api_hash']
SESSION = os.path.join(settings.DATA_DIR, 'telegram_core_api.session')


async def get_client():
    client = TelegramClient(SESSION, API_ID, API_HASH)
    await client.start()
    return client
