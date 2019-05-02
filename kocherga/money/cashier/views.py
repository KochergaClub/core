import logging
logger = logging.getLogger(__name__)

from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, BasePermission, SAFE_METHODS
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Cheque
from . import serializers


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class IsChequeCreator(BasePermission):
    def has_permission(self, request, view):
        if view.action != 'create':
            return False
        return request.user.has_perm('cheque.create')


class ChequeViewSet(viewsets.ModelViewSet):
    queryset = Cheque.objects.all()
    permission_classes = [(IsAdminUser & ReadOnly) | IsChequeCreator]
    serializer_class = serializers.ChequeSerializer

    # TODO - cheque.redeem permission
    @action(detail=True, methods=['post'])
    def redeem(self, request, pk=None):
        cheque = self.get_object()
        cheque.redeem()

        return Response('ok')
