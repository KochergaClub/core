from rest_framework.routers import SimpleRouter

from . import views

urlpatterns = []

router = SimpleRouter(trailing_slash=False)
router.register('email/subscribe_channel', views.SubscribeChannelViewSet)

urlpatterns += router.urls
