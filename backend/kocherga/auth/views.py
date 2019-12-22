import logging
logger = logging.getLogger(__name__)

import django.core.exceptions
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.contrib.auth import login, logout, authenticate, get_user_model
from django.contrib.auth.models import Group, Permission
from django.contrib.auth.password_validation import validate_password

from django.template.loader import render_to_string
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import exceptions, permissions, viewsets

import markdown
import urllib.parse

from .view_utils import get_magic_token
from . import serializers


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
            result['is_superuser'] = request.user.is_superuser

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
            raise exceptions.ParseError('credentials are not set')
        credentials = request.data['credentials']

        if 'token' not in credentials and not ('email' in credentials and 'password' in credentials):
            raise exceptions.ParseError('One of `token` and `email`+`password` must be set')

        # other results, e.g. access_token, will be supported later
        if 'result' not in request.data:
            raise exceptions.ParseError('result parameter is not set')
        if request.data['result'] != 'cookie':
            raise exceptions.ParseError('Only `cookie` result is supported')

        try:
            user = authenticate(
                request,
                username=credentials.get('email', None),
                password=credentials.get('password', None),
                token=credentials.get('token', None),
            )
        except django.core.exceptions.ValidationError as e:
            raise exceptions.AuthenticationFailed(e.message)

        if not user:
            logger.info('no user')
            raise exceptions.AuthenticationFailed()

        login(request, user)

        return Response({
            'registered': getattr(request, 'registered', False),
        })


class SetPasswordView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        old_password = request.data.get('old_password', None)

        if 'new_password' not in request.data:
            raise exceptions.ParseError('`new_password` should be set')
        new_password = request.data['new_password']

        user = request.user

        if old_password:
            if not user.check_password(old_password):
                raise exceptions.AuthenticationFailed("Invalid `old_password`")
        else:
            if user.has_usable_password():
                raise exceptions.AuthenticationFailed("`old_password` is not set but user has a password")

        validate_password(new_password)
        user.set_password(new_password)
        user.save()

        return Response('ok')


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response('ok')


class IsAuthAuditor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('auth.audit')


class GroupsViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAuthAuditor,)
    serializer_class = serializers.GroupSerializer
    queryset = Group.objects.all()  # TODO - prefetch users

    @action(detail=True, methods=['post'])
    def remove_user(self, request, **kwargs):
        user_id = request.data['user_id']
        group = self.get_object()
        user = get_user_model().objects.get(pk=user_id)
        group.user_set.remove(user)
        return Response('ok')

    @action(detail=True, methods=['post'])
    def add_user(self, request, **kwargs):
        user_id = request.data['user_id']
        group = self.get_object()
        user = get_user_model().objects.get(pk=user_id)
        group.user_set.add(user)
        return Response('ok')


class PermissionsViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAuthAuditor,)
    serializer_class = serializers.PermissionSerializer
    queryset = Permission.objects.all()  # TODO - prefetch users


class UsersViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAuthAuditor,)
    serializer_class = serializers.UserSerializer
    queryset = get_user_model().objects.all()
