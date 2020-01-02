import logging
logger = logging.getLogger(__name__)

from datetime import datetime, time
from typing import Optional

from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, exceptions, views, response

from kocherga.dateutils import TZ

from .. import models, serializers


class TicketAlreadyExistsException(exceptions.APIException):
    status_code = 400
    default_detail = 'Ticket already exists'


class EventTicketView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = serializers.EventTicketSerializer

    def get_event_id(self):
        return self.kwargs['event_id']

    def get_event(self) -> Optional[models.Event]:
        # TODO - support tickets for non-public events (with proper permissions handling)
        try:
            return models.Event.objects.public_events().get(
                uuid=self.get_event_id()
            )
        except models.Event.DoesNotExist:
            return None

    def get_queryset(self):
        event = self.get_event()
        if not event:
            return models.Ticket.objects.none()
        return models.Ticket.objects.filter(event=event)


class MyEventTicketRegisterView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = self.request.user
        event = models.Event.objects.public_events().get(uuid=self.kwargs['event_id'])

        models.Ticket.objects.register(
            user=user,
            event=event,
        )

        return response.Response('ok')


class MyEventTicketUnregisterView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = self.request.user
        event = models.Event.objects.public_events().get(uuid=self.kwargs['event_id'])

        models.Ticket.objects.unregister(user=user, event=event)

        return response.Response('ok')


class AnonEventTicketRegisterView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        KchUser = get_user_model()
        email = request.data.get('email')

        try:
            user = KchUser.objects.get(email=email)
        except KchUser.DoesNotExist:
            user = KchUser.objects.create_user(email)

        event = models.Event.objects.public_events().get(uuid=self.kwargs['event_id'])

        models.Ticket.objects.register(
            user=user,
            event=event,
            subscribed_to_newsletter=request.data.get('subscribed_to_newsletter', False),
        )

        return response.Response('ok')


class MyTicketView(
        generics.ListAPIView,
):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.MyTicketSerializer

    def get_queryset(self):
        return models.Ticket.objects.filter(
            user=self.request.user,
            event__start__gte=datetime.combine(datetime.today().date(), time.min, tzinfo=TZ),
        ).order_by('event__start')
