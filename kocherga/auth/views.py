from django.conf import settings

from django.urls import reverse
from django.http import HttpResponse
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.contrib.auth import login, logout, get_user_model

from django.core.signing import TimestampSigner

import urllib.parse

from .forms import LoginForm

def get_magic_token(email):
    return TimestampSigner().sign(email)

def check_magic_token(token):
    return TimestampSigner().unsign(token, max_age=600)

class LoginView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('/')

        return render(request, 'auth/login.html', {
            'form': str(LoginForm()),
        })

    def post(self, request):
        form = LoginForm(request.POST)
        if not form.is_valid():
            return render(request, 'auth/login.html', {
                'form': form,
            })

        email = form.cleaned_data['email']

        magic_token = get_magic_token(email)
        params_str = urllib.parse.urlencode({
            'token': magic_token,
            'next': request.GET.get('next', reverse('admin:index')),
        })
        magic_link = request.build_absolute_uri(reverse('auth:magic-link') + '?' + params_str)

        send_mail(
            'Войти на сайт Кочерги',
            f"Кто-то ввёл ваш email в форму логина на сайте Кочерги. Если это были вы, нажмите эту ссылку, чтобы войти: {magic_link}",
            'robot@kocherga-club.ru',
            [email],
        )

        return redirect(reverse('auth:sent-magic-link'))

class SentMagicLinkView(View):
    def get(self, request):
        return render(request, 'auth/check-your-email.html')

class MagicLinkView(View):
    def get(self, request):
        magic_token = request.GET['token']
        email = check_magic_token(magic_token)

        User = get_user_model()

        registered = False
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = User.objects.create_user(email)
            registered = True

        login(request, user)

        if registered:
            return redirect(reverse('auth:registered'))
        else:
            next_url = request.GET.get('next', reverse('admin:index'))
            return redirect(next_url)

class RegisteredView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'auth/registered.html')

class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('auth:login')
