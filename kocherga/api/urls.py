from django.urls import include, path, re_path
from django.views.generic.base import TemplateView

from . import views


announcement_patterns = [
    path('timepad/event/<event_id>', views.announcements.TimepadPostView.as_view()),
    path('timepad/categories', views.announcements.TimepadCategoriesView.as_view()),
    path('vk/groups', views.announcements.r_vk_groups),
    path('vk/update_wiki_schedule', views.announcements.r_vk_update_wiki_schedule),
    path('vk/event/<event_id>', views.announcements.r_vk_post),
    path('fb/groups', views.announcements.r_fb_groups),
    path('fb/event/<event_id>', views.announcements.r_fb_post),

    # legacy - to be removed (after we refactor urls in evenman)
    path('vk/create_schedule_post', views.announcements.r_weekly_digest_post_vk),
    path('telegram/post_schedule', views.announcements.r_weekly_digest_post_telegram),
    path('email/post_digest', views.announcements.r_weekly_digest_post_mailchimp_draft),
]

urlpatterns = [
    path('', TemplateView.as_view(template_name='api/index.html')),

    path('announcements/', include(announcement_patterns)),
    path('schedule/weekly-image', views.announcements.r_schedule_weekly_image),
    path('screenshot/error', views.announcements.r_last_screenshot),

    path('weekly-digest/current/vk', views.announcements.r_weekly_digest_post_vk),
    path('weekly-digest/current/telegram', views.announcements.r_weekly_digest_post_telegram),
    path('weekly-digest/current/mailchimp-draft', views.announcements.r_weekly_digest_post_mailchimp_draft),

    path('rooms', views.rooms.RoomsView.as_view()),

    path('my/bookings', views.bookings.r_list_my),
    re_path(r'bookings/(?P<date_str>(?:\d{4}-\d{2}-\d{2}|today))', views.bookings.r_list_by_date),
    path('bookings', views.bookings.r_create),
    path('bookings/<event_id>', views.bookings.r_delete),

    path('event_prototypes', views.event_prototypes.RootView.as_view()),
    path('event_prototypes/<prototype_id>', views.event_prototypes.ObjectView.as_view()),
    path('event_prototypes/<prototype_id>/instances', views.event_prototypes.r_prototype_instances),
    path('event_prototypes/<prototype_id>/cancel_date/<date_str>', views.event_prototypes.r_prototype_cancel_date),
    path('event_prototypes/<prototype_id>/new', views.event_prototypes.r_prototype_new_event),
    path('event_prototypes/<prototype_id>/image', views.event_prototypes.r_upload_image),
    path('event_prototypes/<prototype_id>/tag/<tag_name>', views.event_prototypes.TagView.as_view()),

    path('events', views.events.RootView.as_view()),
    path('event/<event_id>', views.events.ObjectView.as_view()),
    path('event/<event_id>/image/<image_type>', views.events.ImageView.as_view()),
    path('event/<event_id>/image_from_url/<image_type>', views.events.ImageFromUrlView.as_view()),
    path('event/<event_id>/tag/<tag_name>', views.events.TagView.as_view()),
    path('public_events', views.events.r_list_public),
    path('public_events/today', views.events.r_list_public_today),
    path('public_events_atom', views.events.r_list_public_atom),

    path('cookies/pick', views.supplies.r_pick_cookie),
    path('cookies/pick-neither', views.supplies.r_pick_neither_cookie),

    path('images/<image_id>', views.images.r_image),

    path('hooks/vk_callback', views.hooks.r_vk_callback),
    path('auth/google', views.auth.r_google),
    path('auth/check', views.auth.r_check),

    path('templater/<name>/html', views.templater.r_html),
    path('templater/<name>/png', views.templater.r_png),
    path('templater/<name>/schema', views.templater.r_schema),
    path('templater', views.templater.r_list),

    path('fb/token', views.fb.TokenView.as_view()),
]
