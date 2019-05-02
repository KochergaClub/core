from rest_framework.routers import SimpleRouter

from . import views


router = SimpleRouter()
router.register('member', views.MemberViewSet)

urlpatterns = router.urls
