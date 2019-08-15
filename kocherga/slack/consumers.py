import logging
logger = logging.getLogger(__name__)

import channels.consumer

from .client import client


class NotifyConsumer(channels.consumer.SyncConsumer):
    def notify(self, message):
        logger.info(f"Notifying Slack: {message['text']}")

        args = {
            'text': message['text'],
            'channel': message['channel'],
        }
        if 'attachments' in message:
            logger.info('Message has attachments')
            args['attachments'] = message['attachments']

        client().api_call(
            "chat.postMessage",
            **args
        )
