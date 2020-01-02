from django.urls import path

from . import views

urlpatterns = [
    path('cm/me/set-privacy-mode', views.SetPrivacyModeView.as_view()),
    path('people/now', views.people_now_view),
]
