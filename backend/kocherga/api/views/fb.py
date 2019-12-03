from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from kocherga.fb import models


class TokenView(APIView):
    permission_classes = (IsAdminUser,)

    def post(self, request):
        models.Auth.objects.set(request.data['access_token'])
        return Response('ok')
