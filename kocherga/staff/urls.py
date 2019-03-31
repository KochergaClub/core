from django.urls import path

from . import views

app_name = 'staff'
urlpatterns = [
    path('', views.index_page),
    path('<int:member_id>', views.member_page),
]
