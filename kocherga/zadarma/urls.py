from django.urls import path
from . import views

app_name = 'zadarma'
urlpatterns = [
    path('', views.MainView.as_view()),
    path('pbx_call/<str:pbx_call_id>', views.PbxCallView.as_view()),
]
