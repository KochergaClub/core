from django.urls import path
from . import views

app_name = 'ratio'
urlpatterns = [
    path('', views.MainView.as_view(), name='index'),
    path('training/<str:name>', views.TrainingView.as_view(), name='training'),
]
