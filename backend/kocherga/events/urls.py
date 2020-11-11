from django.urls import path

from . import views

urlpatterns = [
    path('sitemap/events', views.events.SitemapView.as_view()),
    path('public_events_atom', views.events.r_list_public_atom),
]
