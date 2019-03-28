from django.urls import path
from . import views

app_name = 'zadarma'
urlpatterns = [
    path('', views.MainView.as_view(), name='index'),
]
