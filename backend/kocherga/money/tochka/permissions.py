from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsRecordViewer(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS and request.user.has_perm(
            'tochka.view_record'
        )
