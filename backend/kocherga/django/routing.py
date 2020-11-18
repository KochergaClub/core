import kocherga.email.channels
import kocherga.events.channels
import kocherga.slack.channels
from channels.auth import AuthMiddlewareStack
from channels.routing import ChannelNameRouter, ProtocolTypeRouter, URLRouter
from kocherga.graphql.asgi import asgi_graphql_app

from django.core.asgi import get_asgi_application
from django.urls import path

application = ProtocolTypeRouter(
    {
        "websocket": AuthMiddlewareStack(
            URLRouter(
                [
                    path("ws/graphql", asgi_graphql_app),
                ]
            )
        ),
        "channel": ChannelNameRouter(
            {
                **kocherga.email.channels.workers,
                **kocherga.events.channels.workers,
                **kocherga.slack.channels.workers,
            }
        ),
        "http": get_asgi_application(),
    }
)
