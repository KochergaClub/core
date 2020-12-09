from django.urls import path

from . import views

# from django.urls import re_path
# from django.views.generic.base import TemplateView


urlpatterns = [
    # path('my/bookings', views.bookings.r_list_my),
    # re_path(
    #     r'bookings/(?P<date_str>(?:\d{4}-\d{2}-\d{2}|today))',
    #     views.bookings.r_list_by_date,
    # ),
    # path('bookings', views.bookings.r_create),
    # path('bookings/<event_uuid>', views.bookings.r_delete),
    path('cookies/pick', views.supplies.r_pick_cookie),
    path('cookies/pick-neither', views.supplies.r_pick_neither_cookie),
    path('hooks/vk_callback', views.hooks.r_vk_callback),
    path('hooks/tilda_webhook', views.hooks.r_tilda_webhook),
    path('hooks/generate_promocode', views.hooks.r_generate_promocode_webhook),
    path('hooks/create_community_lead', views.hooks.r_create_community_lead_webhook),
    path('auth/google', views.auth.r_google),
    path('auth/check', views.auth.r_check),
    path('fb/token', views.fb.TokenView.as_view()),
]
