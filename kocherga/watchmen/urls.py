from django.urls import path

from . import views

urlpatterns = [
    path('schedule', views.ShiftList.as_view(), name='index'),
    path('schedule/<str:date>/<str:shift>', views.ShiftUpdate.as_view(), name='update'),
]
