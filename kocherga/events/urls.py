from rest_framework import routers
from django.urls import path

from . import views

urlpatterns = []
router = routers.SimpleRouter(trailing_slash=False)

# Events
urlpatterns += [
    path('events', views.events.RootView.as_view()),
    path('event/<event_id>', views.events.ObjectView.as_view()),
    path('event/<event_id>/image/<image_type>', views.events.ImageView.as_view()),
    path('event/<event_id>/image_from_url/<image_type>', views.events.ImageFromUrlView.as_view()),
    path('event/<event_id>/tag/<tag_name>', views.events.TagView.as_view()),
]


# Public events
router.register('public_events', views.events.PublicEventsViewSet, basename='public_events')
urlpatterns += [
    path('public_events/today', views.events.r_list_public_today),
    path('public_events_atom', views.events.r_list_public_atom),
]

# Event prototypes
router.register('event_prototypes', views.event_prototypes.RootViewSet)
urlpatterns += router.urls
urlpatterns += [
    path('event_prototypes/<prototype_id>/tag/<tag_name>', views.event_prototypes.TagView.as_view()),
]
