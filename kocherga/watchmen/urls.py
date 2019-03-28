from django.urls import path

from . import views

app_name = 'watchmen'
urlpatterns = [
    path('', views.index, name='index'),
    path('action/set_watchman_for_shift', views.SetWatchmanForShift.as_view()),
]
