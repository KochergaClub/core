from django.urls import path
from django.views.generic.base import RedirectView

from . import views

app_name = 'auth'
urlpatterns = [
    path('login', views.LoginView.as_view(), name='login'),
    path('admin/login/', RedirectView.as_view(url='/login', query_string=True)),
    path('logout', views.LogoutView.as_view(), name='logout'),
    path('login/check-your-email', views.SentMagicLinkView.as_view(), name='sent-magic-link'),
    path('login/magic-link', views.MagicLinkView.as_view(), name='magic-link'),
    path('login/registered', views.RegisteredView.as_view(), name='registered'),
]
