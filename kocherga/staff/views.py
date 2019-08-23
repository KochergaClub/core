from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import permissions
from rest_framework.response import Response

from .models import Member
from .serializers import MemberSerializer
import kocherga.staff.tools


class IsStaffManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('staff.manage')


class IsWatchmenManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('watchmen.manage')


class MemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Member.objects.all()
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = MemberSerializer

    @action(detail=True, methods=['post'], permission_classes=[IsStaffManager])
    def grant_google_permissions(self, request, pk=None):
        member = self.get_object()
        member.grant_google_permissions()
        return Response({'status': 'ok'})

    @action(detail=True, methods=['post'], permission_classes=[IsStaffManager])
    def fire(self, request, pk=None):
        member = self.get_object()
        member.fire()
        return Response({'status': 'ok'})

    @action(detail=False, methods=['post'], permission_classes=[IsWatchmenManager])
    def add_watchman(self, request, pk=None):
        kocherga.staff.tools.add_watchman(
            short_name=request.data['short_name'],
            full_name=request.data['full_name'],
            email=request.data['email'],
            password=request.data['password'],
        )

        return Response({'status': 'ok'})
