from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter(trailing_slash=False)
router.register('pbx_call', views.PbxCallViewSet, basename='pbx_call')
router.register('pbx_call-paged', views.PagedPbxCallViewSet, basename='pbx_call-paged')

urlpatterns = router.urls
