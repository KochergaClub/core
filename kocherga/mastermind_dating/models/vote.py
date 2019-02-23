from django.db import models

from .user import User

class Vote(models.Model):
    objects: models.QuerySet
    who = models.ForeignKey(User, related_name="who", on_delete=models.CASCADE)
    whom = models.ForeignKey(User, related_name="whom", on_delete=models.CASCADE)
    how = models.IntegerField()
