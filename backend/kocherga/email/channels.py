import logging

logger = logging.getLogger(__name__)

import kocherga.email.lists
from kocherga.django.channels_utils import channel_send

from channels.generic.websocket import SyncConsumer

WORKER_CHANNEL = 'email-worker'


# TODO - support first_name, last_name
def subscribe_to_main_list(email: str):
    channel_send(
        WORKER_CHANNEL,
        {"type": "subscribe_to_main_list", "email": email},
    )


class EmailWorker(SyncConsumer):
    def subscribe_to_main_list(self, message):
        email = message['email']

        # unused for now
        first_name = message.get('first_name', None)
        last_name = message.get('last_name', None)
        card_id = message.get('card_id', None)

        mailchimp_user = kocherga.email.lists.User(
            email=email,
            first_name=first_name,
            last_name=last_name,
            card_id=card_id,
        )
        kocherga.email.lists.populate_main_list([mailchimp_user])

        logger.info(f'Subscribed {email}')


workers = {
    WORKER_CHANNEL: EmailWorker.as_asgi(),
}
