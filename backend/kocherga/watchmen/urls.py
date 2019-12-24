from django.urls import path
from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter(trailing_slash=False)
router.register('watchmen', views.WatchmenViewSet)
router.register('grades', views.GradesViewSet)

urlpatterns = [
    path('schedule', views.ShiftList.as_view()),
    path('schedule/<str:date>/<str:shift>', views.ShiftUpdate.as_view()),
] + router.urls
