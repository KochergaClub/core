from django.urls import path

from . import views

app_name = 'auth'
urlpatterns = [
    path('api/me', views.MeView.as_view()),

    # path('api/auth/logout', views.LogoutView.as_view()),
    # path('api/auth/send-magic-link', views.SendMagicLinkView.as_view()),

    # # legacy
    # path('api/login', views.LoginView.as_view()),
    # path('api/login/send-magic-link', views.SendMagicLinkView.as_view()),

]
