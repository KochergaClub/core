from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter(trailing_slash=False)
router.register('training', views.TrainingViewSet)

urlpatterns = router.urls
