from django.urls import path
from . import views

app_name = 'ratio'
urlpatterns = [
    path('', views.MainView.as_view(), name='index'),
    path('training/<str:name>', views.TrainingView.as_view(), name='training'),
    path('training/<str:name>/action/to_mailchimp', views.TrainingToMailchimpView.as_view(), name='training_to_mailchimp'),
    path('training/<str:name>/action/post_email', views.TrainingPostEmailView.as_view(), name='training_post_email'),
    path('training/<str:name>/schedule', views.ScheduleView.as_view(), name='schedule'),
]
