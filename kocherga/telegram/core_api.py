from telethon import TelegramClient

import kocherga.config

API_ID = kocherga.config.config()['telegram']['core_api']['api_id']
API_HASH = kocherga.config.config()['telegram']['core_api']['api_hash']
SESSION = kocherga.config.config()['telegram']['core_api']['session_file']

def get_client():
    client = TelegramClient(SESSION, API_ID, API_HASH)
    client.start()
    return client
