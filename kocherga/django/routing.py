from channels.routing import ProtocolTypeRouter, ChannelNameRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path

from kocherga.events.consumers import EventsConsumer
import kocherga.slack

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path("ws/events/", EventsConsumer),
        ])
    ),
    "channel": ChannelNameRouter({
        "slack-notify": kocherga.slack.NotifyConsumer,
    }),
    # (http->django views is added by default)
})
