from rest_framework import routers
from . import views

router = routers.SimpleRouter(trailing_slash=False)
router.register(r'faq/entry', views.EntryViewSet, basename='faq-entries')

urlpatterns = router.urls
