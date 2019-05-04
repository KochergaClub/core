from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter(trailing_slash=False)
router.register('member', views.MemberViewSet)

urlpatterns = router.urls
