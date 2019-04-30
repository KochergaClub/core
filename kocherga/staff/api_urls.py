from django.urls import path

from . import api_views

app_name = 'api-staff'
urlpatterns = [
    path('member', api_views.MemberListView.as_view(), name='member'),
]
