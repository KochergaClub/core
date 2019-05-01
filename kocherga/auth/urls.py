from django.urls import path
from django.views.generic.base import RedirectView

from . import views
from . import api_views

app_name = 'auth'
urlpatterns = [
    path('login', views.LoginView.as_view(), name='login'),
    path('login/check-your-email', views.SentMagicLinkView.as_view(), name='sent-magic-link'),
    path('login/magic-link', views.MagicLinkView.as_view(), name='magic-link'),
    path('login/registered', views.RegisteredView.as_view(), name='registered'),
    path('logout', views.LogoutView.as_view(), name='logout'),
    path('admin/login/', RedirectView.as_view(url='/login', query_string=True)),

    path('api/me', api_views.MeView.as_view()),
    path('api/login/send-magic-link', api_views.SendMagicLinkView.as_view()),
    path('api/login', api_views.LoginView.as_view()),
]
