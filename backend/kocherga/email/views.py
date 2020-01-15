from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, permissions, exceptions

from kocherga.django.drf import BulkRetrieveMixin

from . import serializers
from . import models


class EmptyEmailException(exceptions.APIException):
    status_code = 400
    default_detail = 'Email is not set'


# still needed for Tilda hook
# TODO - move to kocherga.api.hooks
class SubscribeChannelViewSet(
        viewsets.ModelViewSet,
        BulkRetrieveMixin,
):
    queryset = models.SubscribeChannel.objects.all()
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = serializers.SubscribeChannelSerializer
    lookup_field = 'slug'

    @action(detail=True, methods=['post'], permission_classes=[permissions.AllowAny])
    def subscribe(self, request, slug):
        channel = self.get_object()

        # Tilda sends test response when adding new webhooks
        if request.data.get('test', '') == 'test':
            return Response('test response')

        email = request.data.get('EMAIL') or request.data.get('email') or request.data.get('Email')
        if not email:
            raise EmptyEmailException()

        channel.subscribe_email(email)
        return Response('ok')
