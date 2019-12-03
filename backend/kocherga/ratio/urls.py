from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter(trailing_slash=False)
router.register('training', views.TrainingViewSet)
router.register('activity', views.ActivityViewSet)
router.register('trainers', views.TrainerViewSet)
router.register('ticket', views.TicketViewSet)

urlpatterns = router.urls
