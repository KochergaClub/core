from django.urls import path

from . import views

app_name = 'my'
urlpatterns = [
    path('', views.MainView.as_view(), name='index')
]
