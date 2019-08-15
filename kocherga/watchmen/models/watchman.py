from django.db import models
from kocherga.staff.models import Member


class Watchman(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='watchman')
