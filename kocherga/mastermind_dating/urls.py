from django.urls import path

from . import views

app_name = 'mastermind_dating'
urlpatterns = [
    path('', views.index, name='index'),
    path('cohort/<int:cohort_id>', views.cohort_page, name='cohort_page'),
    path('action/tinder_activate/<int:user_id>', views.tinder_activate),
    path('action/flip_present/<int:user_id>', views.flip_present),
]
