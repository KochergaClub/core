from rest_framework import routers
from django.urls import path

from . import views

urlpatterns = []

# Event prototypes
router = routers.SimpleRouter(trailing_slash=False)
router.register('event_prototypes', views.event_prototypes.RootViewSet)
urlpatterns += router.urls
urlpatterns += [
    path('event_prototypes/<prototype_id>/tag/<tag_name>', views.event_prototypes.TagView.as_view()),
]
