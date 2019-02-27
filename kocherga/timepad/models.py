from django.db import models
from django.conf import settings

import re


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

    objects = EventManager()

    def __str__(self):
        return f'[{self.id}] {self.name}'


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

    def __str__(self):
        return f'[{self.id}] {self.user.email} / {self.event.name}'
