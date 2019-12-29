from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter(trailing_slash=False)

router.register('kkm', views.KkmViewSet, basename='cashier-kkm')

urlpatterns = router.urls
