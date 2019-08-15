import logging
logger = logging.getLogger(__name__)

from django.db import models

from .client import client


class UserManager(models.Manager):
    def import_from_slack(self):
        sc = client()
        response = sc.api_call("users.list")

        if not response["ok"]:
            raise Exception("Couldn't load the list of users")

        for m in response['members']:
            email = m.get('profile', {}).get('email', None)
            if not email:
                continue
            self.update_or_create(
                slack_id=m['id'],
                defaults={
                    'email': email,
                    'deleted': m.get('deleted'),
                    'image_url': m['profile']['image_512'],
                    'real_name': m.get('real_name', ''),
                }
            )


class User(models.Model):
    deleted = models.BooleanField(default=False)
    slack_id = models.CharField(max_length=40, unique=True)
    email = models.CharField(max_length=255)
    image_url = models.CharField(max_length=1024)
    real_name = models.CharField(max_length=1024, blank=True)

    objects = UserManager()
