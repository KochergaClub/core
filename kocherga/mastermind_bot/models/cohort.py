from django.db import models
from kocherga.events.models import Event as KchEvent

class Cohort(models.Model):
    event = models.OneToOneField(KchEvent, on_delete=models.CASCADE, related_name='+', blank=True, null=True)

    objects = CohortManager()

    def populate_from_event(self):
        if not self.event:
            raise Exception("Cohort doesn't have an associated event")

        timepad_link = self.event.posted_timepad
        if not timepad_link:
            raise Exception("Event is not posted to timepad")

        raise NotImplementedError("TODO")
