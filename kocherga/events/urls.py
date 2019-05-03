from rest_framework import routers
from django.urls import path

from . import views

urlpatterns = []

# Events
urlpatterns += [
    path('events', views.events.RootView.as_view()),
    path('event/<event_id>', views.events.ObjectView.as_view()),
    path('event/<event_id>/image/<image_type>', views.events.ImageView.as_view()),
    path('event/<event_id>/image_from_url/<image_type>', views.events.ImageFromUrlView.as_view()),
    path('event/<event_id>/tag/<tag_name>', views.events.TagView.as_view()),
    path('public_events', views.events.r_list_public),
    path('public_events/today', views.events.r_list_public_today),
    path('public_events_atom', views.events.r_list_public_atom),
]

# Event prototypes
router = routers.SimpleRouter(trailing_slash=False)
router.register('event_prototypes', views.event_prototypes.RootViewSet)
urlpatterns += router.urls
urlpatterns += [
    path('event_prototypes/<prototype_id>/tag/<tag_name>', views.event_prototypes.TagView.as_view()),
]
