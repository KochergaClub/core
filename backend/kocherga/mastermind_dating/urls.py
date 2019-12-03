from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter(trailing_slash=False)
router.register('cohort', views.CohortViewSet)
router.register('participant', views.ParticipantViewSet)

urlpatterns = router.urls
