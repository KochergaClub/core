from django.db import models
from kocherga.staff.models import Member
from .grade import Grade


class Watchman(models.Model):
    member = models.OneToOneField(Member, on_delete=models.CASCADE, related_name='watchman')
    grade = models.ForeignKey(Grade, on_delete=models.PROTECT, related_name='watchmen', blank=True, null=True)

    # 1 = "regular watchman"
    # 2 = "occasional watchman"
    # 3 = "never takes shifts (anymore)"
    priority = models.IntegerField(default=1)
