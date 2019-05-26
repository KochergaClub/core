from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter(trailing_slash=False)
router.register('pbx_call', views.PbxCallViewSet, basename='pbx_call')

urlpatterns = router.urls
