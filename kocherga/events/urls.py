from rest_framework import routers
from django.urls import path, include

from . import views

urlpatterns = []
router = routers.SimpleRouter(trailing_slash=False)

# Events
urlpatterns += [
    path('events', views.events.RootView.as_view()),

    # legacy
    path('event/<event_id>', views.events.ObjectView.as_view()),
    path('event/<event_id>/tickets', views.tickets.EventTicketView.as_view()),
    path('event/<event_id>/tickets/my', views.tickets.MyEventTicketView.as_view()),
    path('event/<event_id>/image/<image_type>', views.events.ImageView.as_view()),
    path('event/<event_id>/image_from_url/<image_type>', views.events.ImageFromUrlView.as_view()),
    path('event/<event_id>/tag/<tag_name>', views.events.TagView.as_view()),

    # modern - plural
    path('events/<event_id>', views.events.ObjectView.as_view()),
    path('events/<event_id>/tickets', views.tickets.EventTicketView.as_view()),
    path('events/<event_id>/tickets/my', views.tickets.MyEventTicketView.as_view()),
    path('events/<event_id>/image/<image_type>', views.events.ImageView.as_view()),
    path('events/<event_id>/image_from_url/<image_type>', views.events.ImageFromUrlView.as_view()),
    path('events/<event_id>/tag/<tag_name>', views.events.TagView.as_view()),

    path('my/tickets', views.tickets.MyTicketView.as_view()),
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

# Announcements
announcement_patterns = [
    path('timepad/event/<event_id>', views.announcements.TimepadPostView.as_view()),
    path('timepad/categories', views.announcements.TimepadCategoriesView.as_view()),

    path('vk/event/<event_id>', views.announcements.r_vk_post),
    path('vk/groups', views.announcements.r_vk_groups),
    path('vk/update_wiki_schedule', views.announcements.r_vk_update_wiki_schedule),

    path('fb/event/<event_id>', views.announcements.r_fb_post),
    path('fb/groups', views.announcements.r_fb_groups),
]

urlpatterns += [
    path('announcements/', include(announcement_patterns)),
    path('screenshot/error', views.announcements.r_last_screenshot),

    path('weekly-digest/current/vk', views.weekly_digest.r_post_vk),
    path('weekly-digest/current/telegram', views.weekly_digest.r_post_telegram),
    path('weekly-digest/current/mailchimp-draft', views.weekly_digest.r_post_mailchimp_draft),
    path('schedule/weekly-image', views.weekly_digest.r_schedule_weekly_image),
]
