import logging

logger = logging.getLogger(__name__)

import channels.layers
from asgiref.sync import async_to_sync

channel_layer = channels.layers.get_channel_layer()


def channel_send(channel: str, message: dict):
    async_to_sync(channel_layer.send)(channel, message)


def channel_group_send(channel: str, message: dict):
    async_to_sync(channel_layer.group_send)(channel, message)


class ChannelsGroup:
    """Encapsulates the typical one-to-many broadcasting pattern. Can be used in GraphQL subscriptions."""

    def __init__(self, name: str):
        self.name = name

    def broadcast(self, msg: dict):
        logger.info(f'Broadcasting to {self.name}')
        channel_group_send(self.name, msg)

    async def subscribe(self):
        channel_name = await channel_layer.new_channel()

        await channel_layer.group_add(self.name, channel_name)
        logger.info(f'Subscribed {channel_name} to {self.name} group')

        while True:
            msg = await channel_layer.receive(channel_name)
            yield msg
