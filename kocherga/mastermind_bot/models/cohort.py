from django.db import models
from kocherga.events.models import Event as KchEvent

class Cohort(models.Model):
    event = models.OneToOneField(KchEvent, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
