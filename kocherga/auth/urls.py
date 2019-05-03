from django.urls import path
from django.views.generic.base import RedirectView

from . import views

app_name = 'auth'
urlpatterns = [
    # TODO - reimplement as /api/logout
    # path('logout', views.LogoutView.as_view(), name='logout'),
    path('admin/login/', RedirectView.as_view(url='/login', query_string=True)),

    path('api/me', views.MeView.as_view()),
    path('api/login/send-magic-link', views.SendMagicLinkView.as_view()),
    path('api/login', views.LoginView.as_view()),
]
