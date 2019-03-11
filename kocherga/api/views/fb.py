from rest_framework.views import APIView
from rest_framework.response import Response

from kocherga.api.auth import auth

from kocherga.fb import models


class TokenView(APIView):
    @auth('kocherga', method=True)
    def post(self, request):
        models.Auth.objects.set(request.data['access_token'])
        return Response('ok')
