from channels.routing import ProtocolTypeRouter, ChannelNameRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path

import kocherga.events.consumers
import kocherga.email.consumers
import kocherga.watchmen.consumers
import kocherga.slack.consumers

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path("ws/events/", kocherga.events.consumers.UpdatesWebsocketConsumer),
            path("ws/watchmen-schedule/", kocherga.watchmen.consumers.ScheduleUpdatesWebsocketConsumer),
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
