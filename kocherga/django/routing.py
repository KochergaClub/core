from channels.routing import ProtocolTypeRouter, ChannelNameRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path

import kocherga.events.consumers
import kocherga.watchmen.consumers
import kocherga.slack

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path("ws/events/", kocherga.events.consumers.UpdatesWebsocketConsumer),
            path("ws/watchmen-schedule/", kocherga.watchmen.consumers.ScheduleUpdatesWebsocketConsumer),
        ])
    ),
    "channel": ChannelNameRouter({
        "slack-notify": kocherga.slack.NotifyConsumer,
        "events-slack-notify": kocherga.events.consumers.NotifySlackConsumer,
    }),
    # (http->django views is added by default)
})
