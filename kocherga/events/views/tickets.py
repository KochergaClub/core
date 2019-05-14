import logging
logger = logging.getLogger(__name__)

from .. import models, serializers
from rest_framework import views, generics, permissions, exceptions
from rest_framework.response import Response


class Permission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return request.user.has_perm('events.view_tickets')
        else:
            return request.user.is_authenticated


class EventTicketView(generics.ListCreateAPIView):
    permission_classes = (Permission,)
    serializer_class = serializers.EventTicketSerializer

    class TicketAlreadyExists(exceptions.APIException):
        status_code = 400
        default_detail = 'Ticket already exists'

    def get_event_id(self):
        return self.kwargs['event_id']

    def get_event(self):
        # TODO - support tickets for non-public events (with proper permissions handling)
        return models.Event.objects.public_events().get(
            pk=self.get_event_id()
        )

    def get_queryset(self):
        return models.Ticket.objects.filter(
            event=self.get_event()
        )

    def perform_create(self, serializer):
        user = self.request.user
        event = self.get_event()
        try:
            models.Ticket.objects.get(user=user, event=event)
            raise self.TicketAlreadyExists()
        except models.Ticket.DoesNotExist:
            serializer.save(
                user=user,
                event=event,
            )


class MyEventTicketView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_event(self, event_id):
        # TODO - support tickets for non-public events (with proper permissions handling)
        return models.Event.objects.public_events().get(
            pk=event_id
        )

    def get(self, request, event_id):
        user = self.request.user
        event = self.get_event(event_id)

        try:
            ticket = models.Ticket.objects.get(user=user, event=event)
            return Response(serializers.EventTicketSerializer(ticket).data)
        except models.Ticket.DoesNotExist:
            raise exceptions.NotFound()
