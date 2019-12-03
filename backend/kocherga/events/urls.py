from rest_framework import routers
from django.urls import path, include

from . import views

urlpatterns = []
router = routers.SimpleRouter(trailing_slash=False)

# Events
urlpatterns += [
    path('events', views.events.RootView.as_view()),
    path('events-paged', views.events.PagedRootView.as_view()),

    # legacy
    path('event/<event_id>', views.events.ObjectView.as_view()),

    path('event/<event_id>/image/<image_type>', views.events.ImageView.as_view()),
    path('event/<event_id>/image_from_url/<image_type>', views.events.ImageFromUrlView.as_view()),
    path('event/<event_id>/tag/<tag_name>', views.events.TagView.as_view()),

    # modern - plural
    path('events/<event_id>', views.events.ObjectView.as_view()),

    path('events/<event_id>/tickets', views.tickets.EventTicketView.as_view()),
    path('events/<event_id>/my_ticket', views.tickets.MyEventTicketView.as_view()),
    path('events/<event_id>/my_ticket/register', views.tickets.MyEventTicketRegisterView.as_view()),
    path('events/<event_id>/my_ticket/unregister', views.tickets.MyEventTicketUnregisterView.as_view()),
    path('events/<event_id>/anon_ticket/register', views.tickets.AnonEventTicketRegisterView.as_view()),

    path('events/<event_id>/image/<image_type>', views.events.ImageView.as_view()),
    path('events/<event_id>/image_from_url/<image_type>', views.events.ImageFromUrlView.as_view()),
    path('events/<event_id>/tag/<tag_name>', views.events.TagView.as_view()),
    path('events/<event_id>/feedbacks', views.events.EventFeedbackView.as_view()),

    path('my/tickets', views.tickets.MyTicketView.as_view()),

    path('sitemap/events', views.events.SitemapView.as_view()),
]


# Public events
router.register('public_events', views.events.PublicEventsViewSet, basename='public_events')
urlpatterns += [
    path('public_events/today', views.events.r_list_public_today),
    path('public_events_atom', views.events.r_list_public_atom),
]

# Event prototypes
router.register('event_prototypes', views.event_prototypes.RootViewSet)
urlpatterns += [
    path('event_prototypes/<prototype_id>/tag/<tag_name>', views.event_prototypes.TagView.as_view()),
]

# Announcements
# (TODO - check if these are working at all - I don't understand how event__uuid is populated)
router.register(r'announcements/timepad', views.announcements.TimepadViewSet, basename='announcements-timepad')
router.register(r'announcements/vk', views.announcements.VkViewSet, basename='announcements-vk')
router.register(r'announcements/fb', views.announcements.FbViewSet, basename='announcements-fb')

old_announcement_patterns = [
    path('timepad/event/<event__uuid>', views.announcements.TimepadViewSet.as_view({'post': 'announce'})),
    path('vk/event/<event__uuid>', views.announcements.VkViewSet.as_view({'post': 'announce'})),
    path('fb/event/<event__uuid>', views.announcements.FbViewSet.as_view({'post': 'announce'})),
]

router.register(r'event_feedbacks', views.feedback.FeedbackViewSet, basename='event-feedbacks')

urlpatterns += [
    path('announcements/', include(old_announcement_patterns)),
    path('screenshot/error', views.announcements.r_last_screenshot),

    path('weekly-digest/current/vk', views.weekly_digest.r_post_vk),
    path('weekly-digest/current/telegram', views.weekly_digest.r_post_telegram),
    path('weekly-digest/current/mailchimp-draft', views.weekly_digest.r_post_mailchimp_draft),
    path('schedule/weekly-image', views.weekly_digest.r_schedule_weekly_image),
]

urlpatterns += router.urls
