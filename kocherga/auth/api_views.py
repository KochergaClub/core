from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
import django.core.signing
from django.contrib.auth import login, get_user_model

from django.template.loader import render_to_string
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import APIException

import markdown
import urllib.parse

from .view_utils import get_magic_token, check_magic_token


class MeView(APIView):
    def get(self, request):
        return Response({
            'is_authenticated': request.user.is_authenticated,
        })

@method_decorator(csrf_exempt, name='dispatch')
class SendMagicLinkView(APIView):
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
    def post(self, request):
        if 'credentials' not in request.data:
            raise APIException('credentials are not set')
        credentials = request.data['credentials']

        if 'token' not in credentials:
            raise APIException('token is not set in credentials')
        magic_token = credentials['token']

        try:
            email = check_magic_token(magic_token)
        except django.core.signing.BadSignature:
            raise APIException('Invalid token')

        # other results, e.g. access_token, will be supported later
        if 'result' not in request.data:
            raise APIException('result parameter is not set')
        if request.data['result'] != 'cookie':
            raise APIException('Only `cookie` result is supported')

        User = get_user_model()

        registered = False
        try:
            user = User.objects.get(email=email)
            if not user.last_login:
                # existed from external data source, e.g. cm_customers
                registered = True
        except User.DoesNotExist:
            user = User.objects.create_user(email)
            registered = True

        login(request, user)

        return Response({
            'registered': registered,
        })
