from rest_framework.routers import SimpleRouter

from . import api_views


router = SimpleRouter()
router.register('member', api_views.MemberViewSet)

urlpatterns = router.urls
