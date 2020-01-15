import logging
logger = logging.getLogger(__name__)

from rest_framework import viewsets
from rest_framework.permissions import BasePermission
from rest_framework.decorators import action
from rest_framework.response import Response

from . import kkm


class IsKkmUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('cashier.kkm_user')


class KkmViewSet(viewsets.ViewSet):
    permission_classes = [IsKkmUser]

    @action(detail=False, methods=['post'])
    def register_check(self, request):
        # TODO - serializer
        return Response(
            kkm.execute(
                kkm.getCheckRequest(
                    kkm.OnlineCheck(
                        email=request.data['email'],
                        title=request.data['title'],
                        sum=int(request.data['sum']),
                        signMethodCalculation=kkm.SignMethodCalculation(request.data['sign_method_calculation']),
                    )
                )
            )
        )

    @action(detail=False, methods=['post'])
    def execute(self, request):
        kkm.execute(request.data)
