import channels.layers
from asgiref.sync import async_to_sync


def channel_send(channel: str, message: dict):
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.send)(channel, message)
