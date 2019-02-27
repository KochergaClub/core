import logging
logger = logging.getLogger(__name__)

from django.contrib.auth import get_user_model
from django.conf import settings

import kocherga.importer.base
import kocherga.email.lists

from .api import api_call, ORGANIZATION_ID

from .models import Event, Order

KchUser = get_user_model()


class Importer(kocherga.importer.base.FullImporter):

    def get_events_data(self):
        api_response = api_call('GET', 'events', {
            'limit': 30,
            'sort': '-starts_at',
            'organization_ids': ORGANIZATION_ID,
            'access_statuses': settings.KOCHERGA_TIMEPAD['default_access_status'],
        })
        return api_response['values']

    def get_orders_data(self, event_id):
        api_response = api_call('GET', f'events/{event_id}/orders', {'limit': 100})
        return api_response.get('values', [])

    def do_full_import(self):
        events_data = self.get_events_data()
        logger.info(f'Importing {len(events_data)} events from Timepad')

        mailchimp_users = []
        for event_data in events_data:
            event_id = event_data['id']
            (event, _) = Event.objects.update_or_create(
                id=event_id,
                defaults={
                    'name': event_data['name'],
                }
            )

            orders_data = self.get_orders_data(event_id)

            logger.info(f'Importing {len(orders_data)} orders for event {event_id}')

            for order_data in orders_data:

                email = order_data['tickets'][0]['answers']['mail']
                first_name = order_data['tickets'][0]['answers']['name']
                last_name = order_data['tickets'][0]['answers']['surname']
                status = order_data['status']['name']

                try:
                    user = KchUser.objects.get(email=email)
                except KchUser.DoesNotExist:
                    user = KchUser.objects.create_user(email)

                    if order_data['subscribed_to_newsletter']:
                        logger.info(f"{email} agreed to newsletter")
                        mailchimp_users.append(
                            kocherga.email.lists.User(
                                first_name=first_name,
                                last_name=last_name,
                                email=email,
                                card_id=None,
                            )
                        )
                    else:
                        logger.info(f"{email} is new but doesn't agree to newsletter")

                Order.objects.update_or_create(
                    id=order_data['id'],
                    event=event,
                    defaults={
                        'user': user,
                        'first_name': first_name,
                        'last_name': last_name,
                        'status': status,
                    }
                )

        if mailchimp_users:
            logger.info(f'Importing {len(mailchimp_users)} users to our mailing list')
            kocherga.email.lists.populate_main_list(mailchimp_users)
