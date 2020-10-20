from django.urls import path

from . import views

urlpatterns = [
    path('money/yandex-kassa/webhook', views.r_webhook),
]
