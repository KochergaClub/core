from django.urls import path
from rest_framework.routers import SimpleRouter

from . import views

urlpatterns = [
    path('my/email/subscription_status', views.MySubscriptionStatusView.as_view()),
    path('my/email/resubscribe', views.ResubscribeView.as_view()),
    path('my/email/unsubscribe', views.UnsubscribeView.as_view()),
    path('my/email/update_interests', views.UpdateInterestsView.as_view()),
]

router = SimpleRouter(trailing_slash=False)
router.register('email/subscribe_channel', views.SubscribeChannelViewSet)
router.register('email/mailchimp_category', views.MailchimpCategoryViewSet)

urlpatterns += router.urls