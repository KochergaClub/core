from django.urls import path

from . import views


urlpatterns = [
    path('wagtail/upload_image', views.ImageView.as_view()),
]
