import logging
logger = logging.getLogger(__name__)

from datetime import datetime
import dateutil.parser

from django.contrib.auth import get_user_model
from django.conf import settings

import kocherga.importer.base
import kocherga.email.lists
from kocherga.dateutils import TZ

from .api import api_call, ORGANIZATION_ID

from .models import Event, Order

KchUser = get_user_model()


class Importer(kocherga.importer.base.IncrementalImporter):

    def get_events_data(self, from_dt: datetime):
        LIMIT = 100
        skip = 0
        items = []
        while True:
            starts_at_min = from_dt.strftime('%Y-%m-%d')
            logger.info(f'Importing chunk from {starts_at_min} with skip={skip}')
            api_response = api_call('GET', 'events', {
                'limit': LIMIT,
                'skip': skip,
                'sort': 'starts_at',
                'organization_ids': ORGANIZATION_ID,
                'access_statuses': settings.KOCHERGA_TIMEPAD['default_access_status'],
                # ends_at is not returned by default; name and starts_at are always returned
                'fields': 'name,starts_at,ends_at',
                'starts_at_min': starts_at_min,
            })
            chunk_items = api_response['values']
            items += chunk_items
            total = api_response['total']
            logger.info(f'Got {len(items)} / {total}')
            if api_response['total'] <= skip + len(chunk_items):
                break  # that's all!
            skip += len(chunk_items)

        return items

    def get_orders_data(self, event_id):
        api_response = api_call('GET', f'events/{event_id}/orders', {'limit': 100})
        return api_response.get('values', [])

    def import_orders(self, event):
        """Fetches and creates timepad orders; yields mailchimp users."""

        orders_data = self.get_orders_data(event.id)

        logger.info(f'Importing {len(orders_data)} orders for event {event.id}')

        for order_data in orders_data:

            order_id = order_data['id']
            email = order_data['tickets'][0]['answers']['mail']
            first_name = order_data['tickets'][0]['answers']['name']
            last_name = order_data['tickets'][0]['answers']['surname']
            status = order_data['status']['name']
            created_at = dateutil.parser.parse(order_data['created_at'])
            subscribed_to_newsletter = order_data.get('subscribed_to_newsletter', False)

            try:
                user = KchUser.objects.get(email=email)
            except KchUser.DoesNotExist:
                user = KchUser.objects.create_user(email)

                if subscribed_to_newsletter:
                    if (datetime.now(tz=TZ) - created_at).seconds > 86400 * 14:
                        logger.info(f"{email} wants to subscribe to the newsletter but order is too old")
                    else:
                        logger.info(f"{email} agreed to newsletter")
                        mailchimp_user = kocherga.email.lists.User(
                            first_name=first_name,
                            last_name=last_name,
                            email=email,
                            card_id=None,
                        )
                        yield mailchimp_user
                else:
                    logger.info(f"{email} is new but doesn't agree to newsletter")

            Order.objects.update_or_create(
                id=order_id,
                event=event,
                defaults={
                    'user': user,
                    'first_name': first_name,
                    'last_name': last_name,
                    'status': status,
                    'created_at': created_at,
                    'subscribed_to_newsletter': subscribed_to_newsletter,
                }
            )

    def get_initial_dt(self):
        return datetime(2015, 8, 1, tzinfo=TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime) -> datetime:
        events_data = self.get_events_data(from_dt)
        logger.info(f'Importing {len(events_data)} events from Timepad')

        mailchimp_users = []
        for event_data in events_data:
            event_id = event_data['id']
            (event, _) = Event.objects.update_or_create(
                id=event_id,
                defaults={
                    'name': event_data['name'],
                    'starts_at': dateutil.parser.parse(event_data['starts_at']),
                    'ends_at': dateutil.parser.parse(event_data['ends_at']),
                }
            )
            for mailchimp_user in self.import_orders(event):
                mailchimp_users.append(mailchimp_user)

        if mailchimp_users:
            logger.info(f'Importing {len(mailchimp_users)} users to our mailing list')
            kocherga.email.lists.populate_main_list(mailchimp_users)

        return datetime.now(tz=TZ)
