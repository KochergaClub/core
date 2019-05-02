from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register('cohort', views.CohortViewSet)
router.register('user', views.UserViewSet)

urlpatterns = router.urls
