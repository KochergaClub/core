from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter(trailing_slash=False)
router.register('training', views.TrainingViewSet)
router.register('activity', views.ActivityViewSet)
router.register('trainers', views.TrainerViewSet)

urlpatterns = router.urls
