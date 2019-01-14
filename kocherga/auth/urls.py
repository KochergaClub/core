from django.urls import path
from . import views

urlpatterns = [
    path('login', views.LoginView.as_view(), name='login'),
    path('logout', views.LogoutView.as_view(), name='logout'),
    path('check-your-email', views.SentMagicLinkView.as_view(), name='sent-magic-link'),
    path('magic-link', views.MagicLinkView.as_view(), name='magic-link'),
    path('registered', views.RegisteredView.as_view(), name='registered'),
    path('signed-in', views.SignedInView.as_view(), name='signed-in'),
]
