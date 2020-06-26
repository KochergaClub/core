import logging

logger = logging.getLogger(__name__)

import django.core.signing
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

from .view_utils import check_magic_token

UserModel = get_user_model()


class TokenBackend:
    def authenticate(self, request, token=None, **kwargs):
        if not token:
            return None

        try:
            email = check_magic_token(token)
        except django.core.signing.SignatureExpired:
            raise ValidationError(f"Token has expired")
        except django.core.signing.BadSignature:
            raise ValidationError(f"Invalid token")

        try:
            user = UserModel.objects.get(email=email)
            if not user.is_active:
                raise ValidationError(f"User is inactive, can't be authenticated")

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
