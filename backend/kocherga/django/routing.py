from channels.routing import ProtocolTypeRouter, ChannelNameRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path

import kocherga.events.consumers
import kocherga.email.consumers
import kocherga.watchmen.consumers
import kocherga.slack.consumers

from kocherga.graphql.asgi import asgi_graphql_app


application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path("ws/events/", kocherga.events.consumers.UpdatesWebsocketConsumer),
            path("ws/watchmen-schedule/", kocherga.watchmen.consumers.ScheduleUpdatesWebsocketConsumer),
            path("ws/graphql", asgi_graphql_app),
        ])
    ),
    "channel": ChannelNameRouter({
        "slack-notify": kocherga.slack.consumers.NotifyConsumer,
        "events-slack-notify": kocherga.events.consumers.NotifySlackConsumer,
        "events-google-export": kocherga.events.consumers.GoogleExportConsumer,
        "mailchimp-subscribe": kocherga.email.consumers.MailchimpSubscribeConsumer,
    }),
    # (http->django views is added by default)
})
