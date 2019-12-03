from datetime import timedelta

from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.response import Response

from django.utils import timezone

from . import models
from . import serializers


class IsZadarmaAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('zadarma.admin')


class PbxCallViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = serializers.PbxCallSerializer

    def get_queryset(self):
        qs = models.PbxCall.objects.filter(ts__gte=timezone.now() - timedelta(days=30))
        if not self.request.user.has_perm('zadarma.admin'):
            qs = qs.filter(data__staff_member__user__pk=self.request.user.pk)
        return qs

    @action(detail=True, methods=['post'], permission_classes=[IsZadarmaAdmin])
    def set_staff_member(self, request, pk=None):
        pbx_call = self.get_object()
        pbx_call.set_staff_member_by_id(request.data['id'])
        return Response({'status': 'ok'})
