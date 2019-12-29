from django.urls import path
from . import views

urlpatterns = [
    path('templater/<name>/html', views.r_html),
    path('templater/<name>/png', views.r_png),
]
