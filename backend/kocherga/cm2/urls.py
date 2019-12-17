from rest_framework import routers

from . import views

router = routers.SimpleRouter(trailing_slash=False)
router.register('cm2/orders', views.OrderViewSet, basename='cm2-orders')

urlpatterns = router.urls
