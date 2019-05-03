from itertools import groupby
from datetime import timedelta

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import exceptions

from django.utils import timezone

from .models import Call
from . import serializers


class IsZadarmaViewer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('zadarma.listen')


class CallIndexView(APIView):
    permission_classes = (IsZadarmaViewer,)
    serializer_class = serializers.CallSerializer

    def get(self, request):
        calls = Call.objects.filter(ts__gte=timezone.now() - timedelta(days=30))[:100]
        pbx_calls = [
            serializers.CallSerializer(g, many=True).data
            for k, g in groupby(calls, key=lambda call: call.pbx_call_id)
        ]

        return Response(pbx_calls)


class CallDetailView(APIView):
    permission_classes = (IsZadarmaViewer,)
    serializer_class = serializers.CallSerializer

    def get(self, request, pbx_call_id):
        calls = Call.objects.filter(pbx_call_id=pbx_call_id)
        if not len(calls):
            raise exceptions.NotFound("PBX call not found")

        return Response(
            serializers.CallSerializer(calls, many=True).data
        )
