from kocherga.django.channels_utils import channel_send

from channels.consumer import SyncConsumer

from . import models, utils

WORKER_CHANNEL = 'telegram-worker'

# note that chat_id is an id in models.Chat, not telegram api chat_id
def post_to_telegram_chat(chat_id: int, message: str):
    channel_send(
        WORKER_CHANNEL,
        {
            "type": "post_to_telegram_chat",
            "chat_id": chat_id,
            "message": message,
        },
    )


class TelegramWorker(SyncConsumer):
    def post_to_telegram_chat(self, message):
        chat_id = message['chat_id']
        message = message['message']
        chat = models.Chat.objects.get(pk=chat_id)
        utils.post_to_chat(message, chat.chat_id)


workers = {
    WORKER_CHANNEL: TelegramWorker.as_asgi(),
}
