import logging
logger = logging.getLogger(__name__)

import django.core.signing
from django.contrib.auth import get_user_model

from .view_utils import check_magic_token

UserModel = get_user_model()


class TokenBackend:
    def authenticate(self, request, token=None, **kwargs):
        if not token:
            return None

        try:
            email = check_magic_token(token)
        except django.core.signing.BadSignature:
            logger.warning(f"Invalid token {token}")
            return None

        try:
            user = UserModel.objects.get(email=email)
            if not user.is_active:
                logger.warning(f"User {email} is inactive, can't be authenticated")
                return None

            if not user.last_login:
                # existed from external data source, e.g. cm_customers
                request.registered = True
        except UserModel.DoesNotExist:
            user = UserModel.objects.create_user(email)
            request.registered = True

        return user

    def get_user(self, user_id):
        # copy-pasted from ModelBackend, is this necessary?
        # Django's documentation says that get_user() method is required.
        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None
        return user if user.is_active else None
