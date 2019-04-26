from django.urls import path
from . import views

app_name = 'projects'
urlpatterns = [
    path('', views.MainView.as_view(), name='index'),
    path('<str:name>', views.DetailView.as_view(), name='detail'),
]
