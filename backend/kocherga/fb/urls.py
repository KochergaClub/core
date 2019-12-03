from django.urls import path
from . import views

urlpatterns = [
    path('fb/marketing/audience', views.MarketingAudienceView.as_view()),
    path('fb/marketing/audience/upload_ratio_tickets', views.MarketingAudienceUploadRatioTicketsView.as_view()),
]
