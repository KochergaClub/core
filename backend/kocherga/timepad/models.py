import logging

logger = logging.getLogger(__name__)

from django.db import models
from django.conf import settings

import re

import kocherga.events.models


ORGANIZATION = settings.KOCHERGA_TIMEPAD["organization"]


class EventManager(models.Manager):
    def get_by_link(self, link):
        match = re.match(r'https://[^.]+\.timepad\.ru/event/(\d+)$', link)
        if not match:
            raise Exception(f"{link} doesn't look like timepad link")

        event_id = match.group(1)
        return self.get(id=event_id)


class Event(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    starts_at = models.DateTimeField(null=True)
    ends_at = models.DateTimeField(null=True)

    objects = EventManager()

    def __str__(self):
        return f'[{self.id}] {self.name}'

    def get_kocherga_event(self):
        announcement = kocherga.events.models.TimepadAnnouncement.objects.find_by_timepad_id(
            self.id
        )
        return announcement.event

    def link(self):
        return f'https://{ORGANIZATION}.timepad.ru/event/{self.id}'


# Timepad's own data model includes Tickets inside each Order,
# and email/first_name/last_name are actually ticket's properties.
#
# But we don't use multiregistrations, so it doesn't matter much for now.
class Order(models.Model):
    id = models.IntegerField(primary_key=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='orders')
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='timepad_orders',
    )
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    status = models.CharField(max_length=40)

    created_at = models.DateTimeField()
    subscribed_to_newsletter = models.BooleanField()

    def __str__(self):
        return f'[{self.id}] {self.user.email} / {self.event.name}'

    def create_native_ticket(self):
        kocherga_event = self.event.get_kocherga_event()

        # TODO - this doesn't update native tickets, but timepad registrations can become cancelled.
        (ticket, created) = kocherga.events.models.Ticket.objects.get_or_create(
            user=self.user,
            event=kocherga_event,
            defaults={
                'from_timepad': True,
                'subscribed_to_newsletter': self.subscribed_to_newsletter,
                'status': self.status,
            },
        )
        if created:
            # created field can't be overriden through `defaults` for some reason
            ticket.created = self.created_at
            ticket.save()

            logger.info(f'Created native ticket {ticket.pk} from order {self}')
        else:
            logger.info(f'Native ticket {ticket.pk} already exists for order {self}')
