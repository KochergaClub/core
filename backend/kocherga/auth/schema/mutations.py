import logging

logger = logging.getLogger(__name__)

from typing import Optional

from kocherga.graphql import g
from kocherga.graphql.helpers import Collection
from kocherga.graphql.decorators import auth

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


c = Collection()


@c.field
def authAddUserToGroup(helper):
    @auth(permission='auth.audit')
    def resolve(_, info, group_id, user_id):
        group = auth_models.Group.objects.get(pk=group_id)
        user = get_user_model().objects.get(pk=user_id)
        group.user_set.add(user)
        return True

    # authAddUserToGroup(group_id: ID!, user_id: ID!): Boolean @auth(permission: "auth.audit")
    return g.Field(
        g.Boolean,
        args=g.arguments({'group_id': 'ID!', 'user_id': 'ID!'}),
        resolve=resolve,
    )


@c.field
def authRemoveUserFromGroup(helper):
    @auth(permission='auth.audit')
    def resolve(_, info, group_id, user_id):
        group = auth_models.Group.objects.get(pk=group_id)
        user = get_user_model().objects.get(pk=user_id)
        group.user_set.remove(user)
        return True

    # authRemoveUserFromGroup(group_id: ID!, user_id: ID!): Boolean @auth(permission: "auth.audit")
    return g.Field(
        g.Boolean,
        args=g.arguments({'group_id': 'ID!', 'user_id': 'ID!'}),
        resolve=resolve,
    )


@c.field
def authLogin(helper):
    def resolve(_, info, input):
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

    # input AuthLoginInput {
    #   credentials: AuthLoginCredentialsInput!
    #   result: String!
    # }
    Input = g.InputObjectType(
        'AuthLoginInput',
        lambda: g.input_fields(
            {
                'credentials': g.NN(CredentialsInput),
                # Must be `cookie`; other results, e.g. `access_token` or `jwt`, might be supported later.
                'result': str,
            }
        ),
    )

    # # Either `token` or `email`+`password` must be set.
    # # (GraphQL doesn't support union inputs yet;
    # see https://github.com/graphql/graphql-spec/blob/master/rfcs/InputUnion.md for details.)
    # input AuthLoginCredentialsInput {
    #   email: String
    #   password: String
    #   token: String
    # }
    CredentialsInput = g.InputObjectType(
        'AuthLoginCredentialsInput',
        g.input_fields(
            {'email': Optional[str], 'password': Optional[str], 'token': Optional[str]}
        ),
    )

    # type AuthLoginResult {
    #   error: String
    #   user: AuthCurrentUser
    #   registered: Boolean
    # }
    Result = g.NN(
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

    # authLogin(input: AuthLoginInput!): AuthLoginResult!
    return g.Field(Result, args={'input': g.NN(Input)}, resolve=resolve)


@c.field
def authSetPassword(helper):
    @auth(authenticated=True)
    def resolve(_, info, input):
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

    # input AuthSetPasswordInput {
    #   old_password: String
    #   new_password: String!
    # }
    Input = g.InputObjectType(
        'AuthSetPasswordInput',
        g.input_fields(
            {
                # required if old password exists
                'old_password': Optional[str],
                'new_password': str,
            }
        ),
    )

    # TODO - generalize into "SimpleMutationResult"?
    Result = g.ObjectType(
        'AuthSetPasswordResult',
        g.fields({'error': Optional[str], 'ok': Optional[bool]}),
    )

    # authSetPassword(input: AuthSetPasswordInput!): AuthSetPasswordResult! @auth(authenticated: true)
    return g.Field(g.NN(Result), args={'input': g.NN(Input)}, resolve=resolve,)


@c.field
def authLogout(helper):
    @auth(authenticated=True)
    def resolve(_, info):
        logout(info.context)
        return {'ok': True}

    Result = g.ObjectType('AuthLogoutResult', g.fields({'ok': Optional[bool]}))

    return g.Field(g.NN(Result), resolve=resolve)


@c.field
def authSendMagicLink(helper):
    def resolve(_, info, input):
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

    # input AuthSendMagicLinkInput {
    #   email: String!
    #   next: String
    # }
    Input = g.InputObjectType(
        'AuthSendMagicLinkInput', g.input_fields({'email': str, 'next': Optional[str]}),
    )

    # type AuthSendMagicLinkResult {
    #   ok: Boolean
    #   error: String
    # }
    Result = g.ObjectType(
        'AuthSendMagicLinkResult',
        g.fields({'ok': Optional[bool], 'error': Optional[str]}),
    )

    return g.Field(g.NN(Result), args={'input': g.NN(Input)}, resolve=resolve,)


@c.field
def authSetMyNames(helper):
    @auth(authenticated=True)
    def resolve(_, info, input):
        first_name = input['first_name']
        last_name = input['last_name']

        user = info.context.user
        user.first_name = first_name
        user.last_name = last_name
        user.full_clean()
        user.save()

        return {'ok': True}

    # input AuthSetMyNamesInput {
    #   first_name: String!
    #   last_name: String!
    # }
    Input = g.InputObjectType(
        'AuthSetMyNamesInput', g.input_fields({'first_name': str, 'last_name': str})
    )

    # type AuthSetMyNamesResult {
    #   error: String
    #   ok: Boolean
    # }
    Result = g.ObjectType(
        'AuthSetMyNamesResult', g.fields({'error': Optional[str], 'ok': Optional[bool]})
    )

    # authSetMyNames(input: AuthSetMyNamesInput!): AuthSetMyNamesResult! @auth(authenticated: true)
    return g.Field(g.NN(Result), args={'input': g.NN(Input)}, resolve=resolve)


mutations = c.as_dict()
