import logging

logger = logging.getLogger(__name__)

from typing import Optional

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm, authenticated

import urllib.parse

import django.core.exceptions
from django.core.validators import validate_email
from django.contrib.auth import (
    models as auth_models,
    get_user_model,
    login,
    logout,
    authenticate,
)
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.template.loader import render_to_string

from kocherga.email.tools import mjml2html

from ..view_utils import get_magic_token

from . import types


c = helpers.Collection()


@c.class_field
class authAddUserToGroup(helpers.BaseField):
    permissions = [user_perm('auth.audit')]
    args = {'group_id': 'ID!', 'user_id': 'ID!'}
    result = bool

    def resolve(self, _, info, group_id, user_id):
        group = auth_models.Group.objects.get(pk=group_id)
        user = get_user_model().objects.get(pk=user_id)
        group.user_set.add(user)
        return True


@c.class_field
class authRemoveUserFromGroup(helpers.BaseField):
    permissions = [user_perm('auth.audit')]
    args = {'group_id': 'ID!', 'user_id': 'ID!'}
    result = bool

    def resolve(self, _, info, group_id, user_id):
        group = auth_models.Group.objects.get(pk=group_id)
        user = get_user_model().objects.get(pk=user_id)
        group.user_set.remove(user)
        return True


@c.class_field
class authLogin(helpers.BaseFieldWithInput):
    permissions = []

    # # Either `token` or `email`+`password` must be set.
    # # (GraphQL doesn't support union inputs yet;
    # see https://github.com/graphql/graphql-spec/blob/master/rfcs/InputUnion.md for details.)
    # input AuthLoginCredentialsInput {
    #   email: String
    #   password: String
    #   token: String
    # }
    credentials_input = g.InputObjectType(
        'AuthLoginCredentialsInput',
        g.input_fields(
            {'email': Optional[str], 'password': Optional[str], 'token': Optional[str]}
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
class authSetPassword(helpers.BaseFieldWithInput):
    permissions = [authenticated]
    input = {
        # required if old password exists
        'old_password': Optional[str],
        'new_password': str,
    }

    # TODO - generalize into "SimpleMutationResult"?
    result = g.NN(
        g.ObjectType(
            'AuthSetPasswordResult',
            g.fields({'error': Optional[str], 'ok': Optional[bool]}),
        )
    )

    def resolve(self, _, info, input):
        old_password = input.get('old_password')
        new_password = input['new_password']

        user = info.context.user

        if old_password:
            if not user.check_password(old_password):
                return {'error': "Неверный старый пароль."}
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

        return {'ok': True}


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

        return {'ok': True}


@c.class_field
class authSetMyNames(helpers.BaseFieldWithInput):
    permissions = [authenticated]
    input = {'first_name': str, 'last_name': str}
    result = g.NN(
        g.ObjectType(
            'AuthSetMyNamesResult',
            g.fields({'error': Optional[str], 'ok': Optional[bool]}),
        )
    )

    def resolve(self, _, info, input):
        first_name = input['first_name']
        last_name = input['last_name']

        user = info.context.user
        user.first_name = first_name
        user.last_name = last_name
        user.full_clean()
        user.save()

        return {'ok': True}


mutations = c.as_dict()
