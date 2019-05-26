from datetime import timedelta

from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.response import Response

from django.utils import timezone

from . import models
from . import serializers


class IsZadarmaViewer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('zadarma.listen')


class PbxCallViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsZadarmaViewer,)
    serializer_class = serializers.PbxCallSerializer

    def get_queryset(self):
        return models.PbxCall.objects.filter(ts__gte=timezone.now() - timedelta(days=30))

    @action(detail=True, methods=['post'], permission_classes=[IsZadarmaViewer])
    def set_staff_member(self, request, pk=None):
        pbx_call = self.get_object()
        pbx_call.set_staff_member_by_id(request.data['id'])
        return Response({'status': 'ok'})
