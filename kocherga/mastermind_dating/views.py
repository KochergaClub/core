from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response

from kocherga.events.models import Event
from . import models
from . import serializers


class CohortViewSet(viewsets.ModelViewSet):
    queryset = models.Cohort.objects.all()
    permission_classes = (IsAdminUser,)  # TODO - more specific permission?
    serializer_class = serializers.CohortSerializer

    @action(detail=True)
    def users(self, request, pk=None):
        cohort = self.get_object()
        return Response(
            serializers.UserSerializer(cohort.users, many=True).data
        )

    @action(detail=True, methods=['post'])
    def set_event(self, request, **kwargs):
        cohort = self.get_object()
        event_id = request.data['event_id']
        event = Event.objects.get(pk=event_id)
        cohort.event = event
        cohort.save()
        return Response(
            self.serializer_class(cohort).data
        )

    @action(detail=True, methods=['post'])
    def unset_event(self, request, **kwargs):
        cohort = self.get_object()
        cohort.event = None
        cohort.save()
        return Response(
            self.serializer_class(cohort).data
        )


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.User.objects.all()
    permission_classes = (IsAdminUser,)
    serializer_class = serializers.UserSerializer

    @action(detail=True, methods=['post'])
    def tinder_activate(self, request, pk=None):
        user = self.get_object()
        user.tinder_activate()
        return Response('ok')

    @action(detail=True, methods=['post'])
    def flip_present(self, request, pk=None):
        user = self.get_object()
        user.present = not user.present
        user.save()
        return Response('ok')
