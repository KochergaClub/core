import logging
logger = logging.getLogger(__name__)

from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, BasePermission, SAFE_METHODS
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Payment
from . import serializers


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class IsPaymentCreator(BasePermission):
    def has_permission(self, request, view):
        if view.action != 'create':
            return False
        return request.user.has_perm('cashier.create')


class IsPaymentRedeemer(BasePermission):
    def has_permission(self, request, view):
        if view.action != 'redeem':
            return False
        return request.user.has_perm('cashier.redeem')


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    permission_classes = [(IsAdminUser & ReadOnly) | IsPaymentCreator | IsPaymentRedeemer]
    serializer_class = serializers.PaymentSerializer

    @action(detail=True, methods=['post'])
    def redeem(self, request, pk=None):
        payment = self.get_object()
        payment.redeem()

        return Response('ok')
