import logging
logger = logging.getLogger(__name__)

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.contrib.auth import login, logout, authenticate

from django.template.loader import render_to_string
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import APIException
from rest_framework import permissions

import markdown
import urllib.parse

from .view_utils import get_magic_token


class MeView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        result = {
            'is_authenticated': request.user.is_authenticated,
            'permissions': request.user.get_all_permissions(),
        }
        if request.user.is_authenticated:
            result['email'] = request.user.email
            result['is_staff'] = request.user.is_staff

        return Response(result)


@method_decorator(csrf_exempt, name='dispatch')
class SendMagicLinkView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data['email']

        magic_token = get_magic_token(email)
        params_str = urllib.parse.urlencode({
            'token': magic_token,
            'next': request.data.get('next', '/'),
        })
        magic_link = request.build_absolute_uri('/login/magic-link' + '?' + params_str)

        html_email_message = markdown.markdown(
            render_to_string('auth/email/login.md', {'magic_link': magic_link})
        )
        plain_email_message = render_to_string('auth/email/login.txt', {'magic_link': magic_link})

        send_mail(
            subject='Войти на сайт Кочерги',
            from_email='robot@kocherga-club.ru',
            html_message=html_email_message,
            message=plain_email_message,
            recipient_list=[email],
        )

        return Response('ok')


class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        if 'credentials' not in request.data:
            raise APIException('credentials are not set')
        credentials = request.data['credentials']

        if 'token' not in credentials and not ('email' in credentials and 'password' in credentials):
            raise APIException('One of `token` and `email`+`password` must be set')

        user = authenticate(
            request,
            username=credentials.get('email', None),
            password=credentials.get('password', None),
            token=credentials.get('token', None),
        )

        if not user:
            logger.info('no user')
            raise APIException('Authentication failed')

        # other results, e.g. access_token, will be supported later
        if 'result' not in request.data:
            raise APIException('result parameter is not set')
        if request.data['result'] != 'cookie':
            raise APIException('Only `cookie` result is supported')

        login(request, user)

        return Response({
            'registered': getattr(request, 'registered', False),
        })


class SetPasswordView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        new_password = request.data['new_password']
        old_password = request.data['old_password']

        user = request.user

        if old_password:
            if not user.check_password(old_password):
                raise APIException("Invalid `old_password`")
        else:
            if user.has_usable_password():
                raise APIException("`old_password` is not set but user has a password")

        user.set_password(new_password)
        user.save()

        return Response('ok')


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response('ok')
