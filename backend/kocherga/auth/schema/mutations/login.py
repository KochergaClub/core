import logging

logger = logging.getLogger(__name__)

import urllib.parse
from typing import Optional

import django.core.exceptions
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.template.loader import render_to_string
from kocherga.email.tools import mjml2html
from kocherga.graphql import django_utils, g, helpers
from kocherga.graphql.permissions import authenticated

from ...utils import get_magic_token
from .. import types

c = helpers.Collection()


@c.class_field
class authLogin(helpers.BaseFieldWithInput):
    permissions = []

    # Either `token` or `email`+`password` must be set.
    # (GraphQL doesn't support union inputs yet;
    # see https://github.com/graphql/graphql-spec/blob/master/rfcs/InputUnion.md for details.)
    credentials_input = g.InputObjectType(
        'AuthLoginCredentialsInput',
        g.input_fields(
            {
                'email': Optional[str],
                'password': Optional[str],
                'token': Optional[str],
            }
        ),
    )

    input = {
        'credentials': g.NN(credentials_input),
        # Must be `cookie`; other results, e.g. `access_token` or `jwt`, might be supported later.
        'result': str,
    }

    result = g.NN(
        g.ObjectType(
            'AuthLoginResult',
            g.fields(
                {
                    'error': Optional[str],
                    'user': types.AuthCurrentUser,
                    'registered': Optional[bool],
                }
            ),
        )
    )

    def resolve(self, _, info, input):
        credentials = input['credentials']

        if 'token' not in credentials and not (
            'email' in credentials and 'password' in credentials
        ):
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


@c.class_field
class setMyPassword(django_utils.SmartMutationMixin, helpers.BaseFieldWithInput):
    permissions = [authenticated]
    input = {
        # required if old password exists
        'old_password': Optional[str],
        'new_password': str,
    }
    ok_result = {
        'ok': bool,
    }

    def smart_resolve(self, _, info, input):
        old_password = input.get('old_password', '')
        new_password = input['new_password']

        user = info.context.user

        if old_password != '':
            if not user.check_password(old_password):
                raise django.core.exceptions.ValidationError(
                    {
                        'old_password': ['Неверный пароль.'],
                    }
                )
        else:
            if user.has_usable_password():
                raise django.core.exceptions.ValidationError(
                    {
                        'old_password': ['Пароль не указан.'],
                    }
                )

        try:
            validate_password(new_password)
        except django.core.exceptions.ValidationError as e:
            raise django.core.exceptions.ValidationError(
                {
                    'new_password': e.messages,
                }
            )

        user.set_password(new_password)
        user.full_clean()
        user.save()

        return {'ok': True}


# @c.class_field
# class requestPasswordReset(django_utils.SmartMutationMixin, helpers.BaseFieldWithInput):
#     permissions = [authenticated]
#     input = {
#         'email': str,
#     }
#     ok_result = {
#         'ok': bool,
#     }

#     def smart_resolve(self, _, info, input):
#         raise NotImplementedError()


@c.class_field
class authLogout(helpers.BaseField):
    permissions = [authenticated]
    result = g.NN(g.ObjectType('AuthLogoutResult', g.fields({'ok': Optional[bool]})))

    def resolve(self, _, info):
        logout(info.context)
        return {'ok': True}


@c.class_field
class authSendMagicLink(helpers.BaseFieldWithInput):
    permissions = []
    input = {'email': str, 'next': Optional[str]}
    result = {'ok': Optional[bool], 'error': Optional[str]}

    def resolve(self, _, info, input):
        email = input['email']

        try:
            validate_email(email)
        except django.core.exceptions.ValidationError as e:
            return {
                'ok': False,
                'error': '\n'.join(e.messages),
            }

        magic_token = get_magic_token(email)
        params_str = urllib.parse.urlencode(
            {'token': magic_token, 'next': input.get('next', '/')}
        )
        magic_link = info.context.build_absolute_uri(
            '/login/magic-link' + '?' + params_str
        )

        html_email_message = mjml2html(
            render_to_string('auth/email/login.mjml', {'magic_link': magic_link})
        )
        plain_email_message = render_to_string(
            'auth/email/login.txt', {'magic_link': magic_link}
        )

        send_mail(
            subject='Войти на сайт Кочерги',
            from_email='robot@kocherga-club.ru',
            html_message=html_email_message,
            message=plain_email_message,
            recipient_list=[email],
        )

        return {'ok': True}


@c.class_field
class authSetMyNames(django_utils.SmartMutationMixin, helpers.BaseFieldWithInput):
    permissions = [authenticated]
    input = {'first_name': str, 'last_name': str}
    ok_result = types.AuthCurrentUser

    def smart_resolve(self, _, info, input):
        first_name = input['first_name']
        last_name = input['last_name']

        user = info.context.user
        user.first_name = first_name
        user.last_name = last_name
        user.full_clean()
        user.save()

        return user


mutations = c.as_dict()
