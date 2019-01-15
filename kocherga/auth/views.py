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
            'form': LoginForm,
        })

    def post(self, request):
        form = LoginForm(request.POST)
        if not form.is_valid():
            return render(request, 'auth/login.html', {
                'form': form,
            })

        email = form.cleaned_data['email']

        magic_token = get_magic_token(email)
        magic_link = request.build_absolute_uri(reverse('magic-link') + '?token=' + urllib.parse.quote(magic_token))

        send_mail(
            'Magic link',
            f"Click me: {magic_link}",
            'nobody@kocherga-club.ru',
            [email],
        )

        return redirect(reverse('sent-magic-link'))

class SentMagicLinkView(View):
    def get(self, request):
        return HttpResponse('go click a link in the email we sent')

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

        return redirect(reverse('admin:index'))

        if registered:
            return redirect(reverse('registered'))
        else:
            return redirect(reverse('signed-in'))

class SignedInView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'auth/signed-in.html', {
            'registered': False,
        })

class RegisteredView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'auth/signed-in.html', {
            'registered': True,
        })

class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('/')
