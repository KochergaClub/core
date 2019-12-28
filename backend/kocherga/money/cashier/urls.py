from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter(trailing_slash=False)

router.register('payment-paged', views.PaymentViewSet)  # deprecated
router.register('payment', views.PaymentViewSet)
router.register('kkm', views.KkmViewSet, basename='cashier-kkm')

urlpatterns = router.urls
