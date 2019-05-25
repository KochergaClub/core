from datetime import timedelta

from rest_framework import permissions
from rest_framework import generics

from django.utils import timezone

from . import models
from . import serializers


class IsZadarmaViewer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('zadarma.listen')


class CallIndexView(generics.ListAPIView):
    permission_classes = (IsZadarmaViewer,)
    serializer_class = serializers.PbxCallSerializer

    def get_queryset(self):
        return models.PbxCall.objects.filter(ts__gte=timezone.now() - timedelta(days=30))[:100]


class CallDetailView(generics.RetrieveAPIView):
    permission_classes = (IsZadarmaViewer,)
    serializer_class = serializers.PbxCallSerializer

    def get_queryset(self):
        return models.PbxCall.objects.filter(ts__gte=timezone.now() - timedelta(days=30))
