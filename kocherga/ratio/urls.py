from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register('training', views.TrainingViewSet)

urlpatterns = router.urls
