from django.urls import path

from . import views

urlpatterns = [
    path('bov_stats', views.BovStatsView.as_view()),
]
