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
    def participants(self, request, pk=None):
        cohort = self.get_object()
        return Response(
            serializers.ParticipantSerializer(cohort.participants, many=True).data
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

    @action(detail=True, methods=['post'])
    def populate_from_event(self, request, **kwargs):
        cohort = self.get_object()
        cohort.populate_from_event()
        return Response('ok')

    @action(detail=True, methods=['post'])
    def send_invite_emails(self, request, **kwargs):
        cohort = self.get_object()
        cohort.send_invite_emails()
        return Response('ok')

    @action(detail=True, methods=['post'])
    def create_group(self, request, **kwargs):
        cohort = self.get_object()
        group = models.Group.objects.create_for_cohort(cohort)
        return Response(
            serializers.GroupSerializer(group).data
        )

    @action(detail=True)
    def groups(self, request, **kwargs):
        cohort = self.get_object()
        return Response(
            serializers.GroupSerializer(cohort.groups.all(), many=True).data
        )

    @action(detail=True, methods=['post'])
    def clear_all_groups(self, request, **kwargs):
        cohort = self.get_object()
        cohort.clear_all_groups()
        return Response('ok')

    @action(detail=True, methods=['post'])
    def run_solver(self, request, **kwargs):
        cohort = self.get_object()
        cohort.run_solver()
        return Response('ok')


class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = models.Participant.objects.all()
    permission_classes = (IsAdminUser,)
    serializer_class = serializers.ParticipantSerializer

    @action(detail=True, methods=['post'])
    def tinder_activate(self, request, pk=None):
        participant = self.get_object()
        participant.tinder_activate()
        return Response('ok')

    @action(detail=True, methods=['post'])
    def flip_present(self, request, pk=None):
        participant = self.get_object()
        participant.present = not participant.present
        participant.save()
        return Response('ok')
