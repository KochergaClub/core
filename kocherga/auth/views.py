"""
These views are deprecated and will be removed after we release `ssr-inverse` branch.

See api_views.py for the modern views.
"""
from django.urls import reverse
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from django.shortcuts import redirect
from django.core.mail import send_mail
from django.contrib.auth import login, logout, get_user_model
from django.template.loader import render_to_string

from kocherga.django.react import react_render

import urllib.parse
import markdown

from .forms import LoginForm

from .view_utils import get_magic_token, check_magic_token



class LoginView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('/')

        return react_render(request, 'auth/login', {
            'djangoForm': str(LoginForm().as_p()),
        })

    def post(self, request):
        form = LoginForm(request.POST)
        if not form.is_valid():
            return react_render(request, 'auth/login', {
                'djangoForm': form.as_p(),
            })

        email = form.cleaned_data['email']

        magic_token = get_magic_token(email)
        params_str = urllib.parse.urlencode({
            'token': magic_token,
            'next': request.GET.get('next', reverse('my:index')),
        })
        magic_link = request.build_absolute_uri(reverse('auth:magic-link') + '?' + params_str)

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

        return redirect(reverse('auth:sent-magic-link'))


class SentMagicLinkView(View):
    def get(self, request):
        return react_render(request, 'auth/check-your-email')


class MagicLinkView(View):
    def get(self, request):
        magic_token = request.GET['token']
        email = check_magic_token(magic_token)

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

        if registered:
            return redirect(reverse('auth:registered'))
        else:
            next_url = request.GET.get('next', reverse('my:index'))
            return redirect(next_url)


class RegisteredView(LoginRequiredMixin, View):
    def get(self, request):
        return react_render(request, 'auth/registered', {
            'index_url': reverse('my:index'),
        })


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('auth:login')
