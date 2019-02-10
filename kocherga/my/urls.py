from django.urls import path

from . import views

app_name = 'my'
urlpatterns = [
    path('', views.MainView.as_view(), name='index'),
    path('action/set-privacy-mode', views.SetPrivacyModeView.as_view(), name='set-privacy-mode')
]
