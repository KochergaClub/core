import logging
logger = logging.getLogger(__name__)

import django.http
from rest_framework import generics, mixins, permissions, exceptions

from .. import models, serializers


class Permission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return request.user.has_perm('events.view_tickets')
        else:
            # only superuser can modify all tickets
            return request.user.is_superuser


class TicketAlreadyExistsException(exceptions.APIException):
    status_code = 400
    default_detail = 'Ticket already exists'


class EventTicketView(generics.ListCreateAPIView):
    permission_classes = (Permission,)
    serializer_class = serializers.EventTicketSerializer

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


class MyEventTicketView(
        mixins.CreateModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        generics.GenericAPIView,
):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.EventTicketSerializer
    lookup_field = 'event__pk'
    lookup_url_kwarg = 'event_id'

    def get_queryset(self):
        return models.Ticket.objects.filter(
            user=self.request.user
        )

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        user = self.request.user
        event = models.Event.objects.public_events().get(
            pk=self.kwargs['event_id']
        )

        try:
            self.get_object()
            raise TicketAlreadyExistsException()
        except django.http.Http404:
            serializer.save(
                user=user,
                event=event,
            )
