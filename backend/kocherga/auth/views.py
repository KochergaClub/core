import logging
logger = logging.getLogger(__name__)

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions


# legacy; still used in pages/_app.tsx
class MeView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        result = {
            'is_authenticated': request.user.is_authenticated,
            'permissions': request.user.get_all_permissions(),
        }
        if request.user.is_authenticated:
            result['email'] = request.user.email
            result['is_staff'] = request.user.is_staff
            result['is_superuser'] = request.user.is_superuser

        return Response(result)
