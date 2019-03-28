from rest_framework import serializers

from . import models


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Member
        fields = ('short_name', 'full_name', 'role', 'is_current', 'color')
