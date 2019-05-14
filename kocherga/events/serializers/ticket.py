from rest_framework import serializers

from .. import models


class EventTicketSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='email', read_only=True)

    class Meta:
        model = models.Ticket
        fields = ('id', 'user')
