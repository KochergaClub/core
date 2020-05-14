from django.urls import path
from . import views

urlpatterns = [
    path('fb/marketing/audience', views.MarketingAudienceView.as_view()),
]
