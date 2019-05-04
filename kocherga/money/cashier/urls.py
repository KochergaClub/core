from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter(trailing_slash=False)
router.register('cheque', views.ChequeViewSet)

urlpatterns = router.urls
