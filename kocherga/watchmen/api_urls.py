from django.urls import path

from . import api_views

app_name = 'api-watchmen'
urlpatterns = [
    path('schedule', api_views.ShiftList.as_view(), name='index'),
    path('schedule/<str:date>/<str:shift>', api_views.ShiftUpdate.as_view(), name='update'),
]
