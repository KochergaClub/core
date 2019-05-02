from django.urls import path

from . import views

urlpatterns = [
    path('pbx_call', views.CallIndexView.as_view()),
    path('pbx_call/<str:pbx_call_id>', views.CallDetailView.as_view()),
]
