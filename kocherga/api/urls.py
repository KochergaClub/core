from django.urls import include, path, re_path
from django.views.generic.base import TemplateView

import kocherga.api.views.people as people
import kocherga.api.views.announcements as announcements
import kocherga.api.views.rooms as rooms
import kocherga.api.views.bookings as bookings
import kocherga.api.views.event_prototypes as event_prototypes
import kocherga.api.views.events as events
import kocherga.api.views.supplies as supplies
import kocherga.api.views.images as images
import kocherga.api.views.hooks
import kocherga.api.views.auth
import kocherga.api.views.templater as templater

announcement_patterns = [
    path('timepad/event/<event_id>', announcements.TimepadPostView.as_view()),
    path('timepad/categories', announcements.TimepadCategoriesView.as_view()),
    path('vk/groups', announcements.r_vk_groups),
    path('vk/update_wiki_schedule', announcements.r_vk_update_wiki_schedule),
    path('vk/create_schedule_post', announcements.r_vk_create_schedule_post),
    path('telegram/post_schedule', announcements.r_telegram_post_schedule),
    path('email/post_digest', announcements.r_email_post_digest),
    path('vk/event/<event_id>', announcements.r_vk_post),
    path('fb/groups', announcements.r_fb_groups),
    path('fb/event/<event_id>', announcements.r_fb_post),
]

urlpatterns = [
    path('', TemplateView.as_view(template_name='api/index.html')),
    path('people/now', people.now),

    path('announcements/', include(announcement_patterns)),
    path('schedule/weekly-image', announcements.r_schedule_weekly_image),
    path('screenshot/error', announcements.r_last_screenshot),

    path('rooms', rooms.RoomsView.as_view()),

    path('my/bookings', bookings.r_list_my),
    re_path(r'bookings/(?P<date_str>(?:\d{4}-\d{2}-\d{2}|today))', bookings.r_list_by_date),
    path('bookings', bookings.r_create),
    path('bookings/<event_id>', bookings.r_delete),

    path('event_prototypes', event_prototypes.RootView.as_view()),
    path('event_prototypes/<prototype_id>', event_prototypes.ObjectView.as_view()),
    path('event_prototypes/<prototype_id>/instances', event_prototypes.r_prototype_instances),
    path('event_prototypes/<prototype_id>/cancel_date/<date_str>', event_prototypes.r_prototype_cancel_date),
    path('event_prototypes/<prototype_id>/new', event_prototypes.r_prototype_new_event),
    path('event_prototypes/<prototype_id>/image', event_prototypes.r_upload_image),
    path('event_prototypes/<prototype_id>/tag/<tag_name>', event_prototypes.TagView.as_view()),

    path('events', events.RootView.as_view()),
    path('event/<event_id>', events.ObjectView.as_view()),
    path('event/<event_id>/property/<key>', events.PropertyView.as_view()),
    path('event/<event_id>/image/<image_type>', events.ImageView.as_view()),
    path('event/<event_id>/image_from_url/<image_type>', events.ImageFromUrlView.as_view()),
    path('event/<event_id>/tag/<tag_name>', events.ImageFromUrlView.as_view()),
    path('public_events', events.r_list_public),
    path('public_events/today', events.r_list_public_today),
    path('public_events_atom', events.r_list_public_atom),

    path('cookies/pick', supplies.r_pick_cookie),
    path('cookies/pick-neither', supplies.r_pick_neither_cookie),

    path('images/<image_id>', images.r_image),

    path('hooks/vk_callback', kocherga.api.views.hooks.r_vk_callback),
    path('auth/google', kocherga.api.views.auth.r_google),
    path('auth/check', kocherga.api.views.auth.r_check),

    path('templater/<name>/html', templater.r_html),
    path('templater/<name>/png', templater.r_png),
    path('templater/<name>/schema', templater.r_schema),
    path('templater', templater.r_list),
]
