import logging
logger = logging.getLogger(__name__)

from datetime import datetime, time

from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, exceptions, views, response

from kocherga.dateutils import TZ

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
            uuid=self.get_event_id()
        )

    def get_queryset(self):
        return models.Ticket.objects.filter(
            event=self.get_event()
        )


class MyEventTicketView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.EventTicketSerializer
    lookup_field = 'event__uuid'
    lookup_url_kwarg = 'event_id'

    def get_queryset(self):
        return models.Ticket.objects.filter(
            user=self.request.user,
            # only future event tickets can be operated upon
            event__start__gte=datetime.combine(datetime.today().date(), time.min, tzinfo=TZ),
            status='ok'
        )

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


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
