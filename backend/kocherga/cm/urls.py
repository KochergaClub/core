from django.urls import path

from . import views

urlpatterns = [
    path('people/now', views.people_now_view),
]
