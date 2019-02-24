from django.db import models

class GroupManager(models.Manager):
    def get_empty(self):
        return self.annotate(user_count=models.Count('users')).filter(user_count=0).first()

class Group(models.Model):
    telegram_invite_link = models.CharField(max_length=255)

    objects = GroupManager()
