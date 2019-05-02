from django.urls import path

from . import views

urlpatterns = [
    path('me', views.MeView.as_view()),
    path('me/set-privacy-mode', views.SetPrivacyModeView.as_view()),
]
