import logging

logger = logging.getLogger(__name__)

from channels.generic.websocket import SyncConsumer

import kocherga.email.lists


class MailchimpSubscribeConsumer(SyncConsumer):
    def subscribe_to_main_list(self, message):
        email = message['email']
        first_name = message.get('first_name', None)
        last_name = message.get('last_name', None)
        card_id = message.get('card_id', None)

        mailchimp_user = kocherga.email.lists.User(
            email=email, first_name=first_name, last_name=last_name, card_id=card_id,
        )
        kocherga.email.lists.populate_main_list([mailchimp_user])

        logger.info(f'Subscribed {email}')
