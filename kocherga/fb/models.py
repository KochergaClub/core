from django.db import models

import requests


class AuthManager(models.Manager):
    def get(self):
        result = self.first()
        if not result:
            raise Exception(
                "FB token is not initialized."
            )
        return result

    def set(self, access_token):
        (result, _) = self.update_or_create(
            id=1,
            defaults={
                'access_token': access_token,
            }
        )
        return result


class Auth(models.Model):
    id = models.IntegerField(primary_key=True, default=1)
    access_token = models.CharField(max_length=1024)

    objects = AuthManager()

    def validate(self):
        requests.get(f"https://graph.facebook.com/v2.12/kocherga.club?fields=picture").raise_for_status()
