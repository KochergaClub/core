from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import permissions
from rest_framework.response import Response

from .models import Member
from .serializers import MemberSerializer


class IsStaffManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('staff.manage')


class MemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Member.objects.all()
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = MemberSerializer

    @action(detail=True, methods=['post'], permission_classes=[IsStaffManager])
    def grant_google_permissions(self, request, pk=None):
        member = self.get_object()
        member.grant_google_permissions()
        return Response({'status': 'ok'})
