from django.urls import path

from . import views

app_name = 'watchmen'
urlpatterns = [
    path('', views.index, name='index'),
]
