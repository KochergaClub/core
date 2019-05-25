from django.urls import path

from . import views

urlpatterns = [
    path('pbx_call', views.CallIndexView.as_view()),
    path('pbx_call/<str:pk>', views.CallDetailView.as_view()),
]
