from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from . import marketing


class IsMarketingUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('fb.marketing')


class MarketingAudienceView(APIView):
    permission_classes = (IsMarketingUser,)

    def get(self, request):
        audiences = marketing.get_audiences()
        return Response(audiences)
