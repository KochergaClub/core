from rest_framework import serializers

from .. import models
from .event import PublicEventSerializer


class EventTicketSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='email', read_only=True)

    class Meta:
        model = models.Ticket
        fields = (
            'id',
            'user',
            'status',
        )


class MyTicketSerializer(serializers.ModelSerializer):
    event = PublicEventSerializer(read_only=True)

    class Meta:
        model = models.Ticket
        fields = ('event',)
