from django.db import models

from .participant import Participant


class Vote(models.Model):
    objects: models.QuerySet

    who = models.ForeignKey(
        Participant, related_name="+", on_delete=models.CASCADE, null=True, blank=True
    )
    whom = models.ForeignKey(
        Participant, related_name="+", on_delete=models.CASCADE, null=True, blank=True
    )

    how = models.IntegerField()
