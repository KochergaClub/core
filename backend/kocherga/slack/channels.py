import logging
from typing import Any

logger = logging.getLogger(__name__)

from kocherga.django.channels_utils import channel_send

import channels.consumer

from .client import client

WORKER_CHANNEL = 'slack-worker'


def notify(
    channel: str, text: str, attachments: list[Any] = None, blocks: list[Any] = None
):
    channel_send(
        WORKER_CHANNEL,
        {
            "type": "notify",
            "channel": channel,
            "text": text,
            **({"attachments": attachments} if attachments else {}),
            **({"blocks": blocks} if blocks else {}),
        },
    )


class SlackWorker(channels.consumer.SyncConsumer):
    def notify(self, message):
        logger.info(f"Notifying Slack: {message['text']}")

        args = {
            'text': message['text'],
            'channel': message['channel'],
        }
        if 'attachments' in message:
            logger.info('Message has attachments')
            args['attachments'] = message['attachments']
        if 'blocks' in message:
            logger.info('Message has blocks')
            args['blocks'] = message['blocks']

        result = client().api_call("chat.postMessage", **args)
        if not result['ok']:
            logger.error(result.get('error', 'Unknown error'))


workers = {
    WORKER_CHANNEL: SlackWorker.as_asgi(),
}
