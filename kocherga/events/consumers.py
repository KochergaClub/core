from asgiref.sync import async_to_sync

from channels.generic.websocket import WebsocketConsumer


class EventsConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            'events_group',
            self.channel_name
        )
        self.accept()

    def notify_update(self, message):
        self.send(text_data='updated')
