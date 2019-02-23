from django.db import models
from kocherga.events.models import Event as KchEvent

from .user import User as MmUser

class Cohort(models.Model):
    event = models.OneToOneField(KchEvent, on_delete=models.CASCADE, related_name='+', blank=True, null=True)

    def populate_from_event(self):
        if not self.event:
            raise Exception("Cohort doesn't have an associated event")

        for user in self.event.registered_users():
            MmUser.objects.create(
                user=user,
                cohort=self,
            )
            # TODO - remove everyone else (people can cancel their registrations)
