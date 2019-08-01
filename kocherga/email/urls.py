from django.urls import path

from . import views

urlpatterns = [
    path('my/email/subscription_status', views.MySubscriptionStatusView.as_view()),
    path('my/email/resubscribe', views.ResubscribeView.as_view()),
    path('my/email/unsubscribe', views.UnsubscribeView.as_view()),
    path('my/email/update_interests', views.UpdateInterestsView.as_view()),
]
