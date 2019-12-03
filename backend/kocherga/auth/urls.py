from django.urls import path
from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter(trailing_slash=False)
router.register('api/auth/groups', views.GroupsViewSet)
router.register('api/auth/permissions', views.PermissionsViewSet)

app_name = 'auth'
urlpatterns = router.urls + [
    path('api/me', views.MeView.as_view()),

    path('api/auth/login', views.LoginView.as_view()),
    path('api/auth/logout', views.LogoutView.as_view()),
    path('api/auth/send-magic-link', views.SendMagicLinkView.as_view()),
    path('api/auth/set-password', views.SetPasswordView.as_view()),

    # legacy
    path('api/login', views.LoginView.as_view()),
    path('api/login/send-magic-link', views.SendMagicLinkView.as_view()),

]
