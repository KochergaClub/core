from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter()
router.register('cheque', views.ChequeViewSet)

urlpatterns = router.urls
