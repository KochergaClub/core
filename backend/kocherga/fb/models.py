import logging

logger = logging.getLogger(__name__)

from django.db import models
from django.conf import settings

import requests

from .constants import SERVER, API_VERSION


class AuthManager(models.Manager):
    def get(self):
        result = self.first()
        if not result:
            raise Exception("FB token is not initialized.")
        return result

    def set(self, access_token):
        APP_ID = settings.KOCHERGA_FB_APP_CREDENTIALS['id']
        APP_SECRET = settings.KOCHERGA_FB_APP_CREDENTIALS['secret']

        logger.debug('Exchanging short-term token to long-term token')
        response = requests.get(
            f"{SERVER}/oauth/access_token?"
            f"grant_type=fb_exchange_token&client_id={APP_ID}&client_secret={APP_SECRET}"
            f"&fb_exchange_token={access_token}"
        )
        if response.status_code >= 400:
            raise Exception(f"Failed to exchange token: {response.json()}")

        long_term_access_token = response.json()['access_token']
        logger.debug(f'Obtained long-term token {long_term_access_token}')

        (result, _) = self.update_or_create(
            id=1, defaults={'access_token': long_term_access_token,}
        )
        return result


class Auth(models.Model):
    id = models.IntegerField(primary_key=True, default=1)
    access_token = models.CharField(max_length=1024)

    objects = AuthManager()

    def validate(self):
        requests.get(
            f"{SERVER}/{API_VERSION}/kocherga.club?fields=picture"
        ).raise_for_status()

    class Meta:
        permissions = (('marketing', 'Может контролировать ФБ-маркетинг'),)
