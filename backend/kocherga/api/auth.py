import logging

logger = logging.getLogger(__name__)

import datetime
import jwt
import json

import requests

from django.conf import settings
from django.contrib.auth import get_user_model
import rest_framework.authentication
import rest_framework.exceptions

from kocherga.error import PublicError

JWT_SECRET_KEY = settings.KOCHERGA_JWT_SECRET_KEY


def get_or_create_user(email):
    User = get_user_model()

    user = None
    try:
        logger.info(f'Found user for email {email}')
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        logger.info(f'User for email {email} not found, creating...')
        user = User.objects.create_user(email)
    return user


def google_auth(request):
    request_json = json.loads(request.body)
    token = request_json.get("token", "")
    team = request_json.get("team", "")
    if not token:
        raise PublicError("token is required")

    r = requests.get(
        "https://www.googleapis.com/oauth2/v3/tokeninfo", params={"id_token": token}
    )
    r.raise_for_status()
    email = r.json()["email"]
    logger.info(f'Authenticated google email {email}')

    user = get_or_create_user(email)

    if team == 'kocherga':
        # legacy check, will be removed later when we stop relying on 'team' param
        if not user.is_staff:
            raise PublicError(
                "Should be a member of the Kocherga team", status_code=403
            )

    token = jwt.encode(
        payload={
            "email": email,
            "source": "google",
            "exp": datetime.datetime.utcnow() + datetime.timedelta(weeks=50),
        },
        key=JWT_SECRET_KEY,
        algorithm="HS256",
    )
    return token.decode("utf-8")


class JWTAuthentication(rest_framework.authentication.BaseAuthentication):
    def authenticate(self, request):
        header = request.META.get('HTTP_AUTHORIZATION', '')

        if not header.startswith("JWT "):
            # that's ok, we might have other authentication methods
            logger.debug('no JWT header')
            return

        logger.debug('decoding JWT header')
        decoded = jwt.decode(header[4:], key=JWT_SECRET_KEY, algorithms="HS256")

        email = decoded["email"]

        User = get_user_model()
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            logger.warn('use for JWT token not found in database')
            raise rest_framework.exceptions.AuthenticationFailed('No such user')

        return (user, None)
