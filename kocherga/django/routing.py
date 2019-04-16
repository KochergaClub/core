from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path

from kocherga.events.consumers import EventsConsumer

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path("ws/events/", EventsConsumer),
        ])
    ),
    # (http->django views is added by default)
})
