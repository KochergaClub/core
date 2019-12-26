from django.urls import path
from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter(trailing_slash=False)

router.register('payment-paged', views.PagedPaymentViewSet)
# deprecated, replace with PagedPaymentViewSet and remove payment-paged later
router.register('payment', views.PaymentViewSet)

urlpatterns = router.urls + [
    path('kkm/password', views.r_get_kkm_password),
    path('kkm/server', views.KkmServerView.as_view()),
]
