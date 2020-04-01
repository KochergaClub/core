import logging
logger = logging.getLogger(__name__)

import markdown
import urllib.parse

import django.core.exceptions
from django.core.validators import validate_email
from django.contrib.auth import models as auth_models, get_user_model, login, logout, authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.template.loader import render_to_string

from kocherga.graphql.types import PrefixedMutationType

from ..view_utils import get_magic_token


def create_mutations():
    Mutation = PrefixedMutationType(prefix='auth')

    @Mutation.field("AddUserToGroup")
    def resolve_AddUserToGroup(_, info, group_id, user_id):
        group = auth_models.Group.objects.get(pk=group_id)
        user = get_user_model().objects.get(pk=user_id)
        group.user_set.add(user)
        return True

    @Mutation.field("RemoveUserFromGroup")
    def resolve_RemoveUserFromGroup(_, info, group_id, user_id):
        group = auth_models.Group.objects.get(pk=group_id)
        user = get_user_model().objects.get(pk=user_id)
        group.user_set.remove(user)
        return True

    @Mutation.field("Login")
    def resolve_Login(_, info, input):
        credentials = input['credentials']

        if 'token' not in credentials and not ('email' in credentials and 'password' in credentials):
            return {
                'error': 'One of `token` and `email`+`password` must be set',
            }

        if input['result'] != 'cookie':
            return {
                'error': 'Only `cookie` result is supported',
            }

        request = info.context

        try:
            user = authenticate(
                request,
                username=credentials.get('email', None),
                password=credentials.get('password', None),
                token=credentials.get('token', None),
            )
        except django.core.exceptions.ValidationError as e:
            return {
                'error': e.message,
            }

        if not user:
            logger.info('bad credentials')
            return {
                'error': 'Некорректные учетные данные.',
            }

        login(request, user)

        return {
            'user': user,
            'registered': getattr(request, 'registered', False),
        }

    @Mutation.field("SetPassword")
    def resolve_SetPassword(_, info, input):
        old_password = input.get('old_password')
        new_password = input['new_password']

        user = info.context.user

        if old_password:
            if not user.check_password(old_password):
                return {
                    'error': "Неверный старый пароль."
                }
        else:
            if user.has_usable_password():
                return {
                    'error': "Старый пароль не указан, но у пользователя есть пароль."
                }

        try:
            validate_password(new_password)
        except django.core.exceptions.ValidationError as e:
            return {
                'ok': False,
                'error': '\n'.join(e.messages),
            }

        user.set_password(new_password)
        user.save()

        return {
            'ok': True
        }

    @Mutation.field("Logout")
    def resolve_Logout(_, info):
        logout(info.context)
        return {
            'ok': True
        }

    @Mutation.field("SendMagicLink")
    def resolve_SendMagicLink(_, info, input):
        email = input['email']

        magic_token = get_magic_token(email)
        params_str = urllib.parse.urlencode({
            'token': magic_token,
            'next': input.get('next', '/'),
        })
        magic_link = info.context.build_absolute_uri('/login/magic-link' + '?' + params_str)

        html_email_message = markdown.markdown(
            render_to_string('auth/email/login.md', {'magic_link': magic_link})
        )
        plain_email_message = render_to_string('auth/email/login.txt', {'magic_link': magic_link})

        try:
            validate_email(email)
        except django.core.exceptions.ValidationError as e:
            return {
                'ok': False,
                'error': '\n'.join(e.messages),
            }

        send_mail(
            subject='Войти на сайт Кочерги',
            from_email='robot@kocherga-club.ru',
            html_message=html_email_message,
            message=plain_email_message,
            recipient_list=[email],
        )

        return {
            'ok': True
        }

    return Mutation


types = [create_mutations()]
