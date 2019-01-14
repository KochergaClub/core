from telethon import TelegramClient

from django.conf import settings

API_ID = settings.KOCHERGA_TELEGRAM['core_api']['api_id']
API_HASH = settings.KOCHERGA_TELEGRAM['core_api']['api_hash']
SESSION = settings.KOCHERGA_TELEGRAM['core_api']['session_file']

def get_client():
    client = TelegramClient(SESSION, API_ID, API_HASH)
    client.start()
    return client
