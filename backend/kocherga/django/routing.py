import kocherga.email.consumers
import kocherga.events.consumers
import kocherga.slack.consumers
import kocherga.watchmen.consumers
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
                    path(
                        "ws/watchmen-schedule/",
                        kocherga.watchmen.consumers.ScheduleUpdatesWebsocketConsumer.as_asgi(),
                    ),
                    path("ws/graphql", asgi_graphql_app),
                ]
            )
        ),
        "channel": ChannelNameRouter(
            {
                "slack-notify": kocherga.slack.consumers.NotifyConsumer,
                "events-slack-notify": kocherga.events.consumers.NotifySlackConsumer,
                "events-google-export": kocherga.events.consumers.GoogleExportConsumer,
                "mailchimp-subscribe": kocherga.email.consumers.MailchimpSubscribeConsumer,
            }
        ),
        "http": get_asgi_application(),
    }
)
