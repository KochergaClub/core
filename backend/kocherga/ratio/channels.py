import logging

logger = logging.getLogger(__name__)

import kocherga.slack.channels
from django.conf import settings
from kocherga.django.channels_utils import channel_send

from channels.consumer import SyncConsumer

from . import models

WORKER_CHANNEL = 'ratio-worker'


def notify_slack_about_fulfilled_order(order: models.Order, ticket: models.Ticket):
    channel_send(
        WORKER_CHANNEL,
        {
            "type": "notify_slack_about_fulfilled_order",
            "order_uuid": order.uuid,
            "ticket_id": ticket.id,
        },
    )


def send_new_ticket_email(ticket: models.Ticket):
    channel_send(
        WORKER_CHANNEL,
        {
            "type": "send_new_ticket_email",
            "ticket_id": ticket.id,
        },
    )


class RatioWorker(SyncConsumer):
    def notify_slack_about_fulfilled_order(self, message):
        logger.info(message)
        order_uuid = message["order_uuid"]
        ticket_id = message["ticket_id"]

        order = models.Order.objects.get(uuid=order_uuid)
        ticket = models.Ticket.objects.get(id=ticket_id)

        ticket_link = f"{settings.KOCHERGA_WEBSITE}/team/ratio/ticket/{ticket.id}"
        text = f'Новый заказ: {ticket_link}'
        kocherga.slack.channels.notify(
            channel="#ratio_orders",
            text=text,
            blocks=[
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": text,
                    },
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": f"*E-mail:* {order.email}",
                        },
                        {
                            "type": "mrkdwn",
                            "text": f"*Имя:* {order.first_name}",
                        },
                        {
                            "type": "mrkdwn",
                            "text": f"*Фамилия:* {order.last_name}",
                        },
                        {
                            "type": "mrkdwn",
                            "text": f"*Сумма:* {order.price} руб.",
                        },
                        {
                            "type": "mrkdwn",
                            "text": f"*Продукт:* {order.ticket_type.training.name}",
                        },
                        {
                            "type": "mrkdwn",
                            "text": f"*Тип билета:* {order.ticket_type.name}",
                        },
                    ],
                },
            ],
        )

    def send_new_ticket_email(self, message):
        ticket_id = message["ticket_id"]
        logger.info(f'sending new_ticket email to {ticket_id}')

        ticket = models.Ticket.objects.get(id=ticket_id)
        ticket.training.send_new_ticket_email(ticket)


workers = {
    WORKER_CHANNEL: RatioWorker.as_asgi(),
}
