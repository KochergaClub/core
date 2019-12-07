from django.contrib.auth import get_user_model

from rest_framework import serializers

from . import models


class CohortSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cohort
        fields = ('id', 'event_id', 'event_title', 'event_start', 'leader_telegram_uid')

    event_id = serializers.CharField(source='event.uuid', required=False, read_only=True)
    event_title = serializers.CharField(source='event.title', required=False, read_only=True)
    event_start = serializers.DateTimeField(source='event.start', required=False, read_only=True)


class ParticipantSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = models.Participant
        fields = (
            'cohort_id', 'email',
            'id', 'user',
            'name', 'desc', 'photo', 'telegram_link',
            'voted_for', 'present', 'invite_email_sent',
        )
        read_only_fields = (
            'id', 'user',
            'name', 'desc', 'photo', 'telegram_link',
            'voted_for', 'invite_email_sent',
        )

    email = serializers.CharField(write_only=True)
    cohort_id = serializers.IntegerField(write_only=True)

    def create(self, validated_data):
        email = validated_data['email']
        cohort_id = validated_data['cohort_id']

        KchUser = get_user_model()
        try:
            kocherga_user = KchUser.objects.get(email=email)
        except KchUser.DoesNotExist:
            kocherga_user = KchUser.objects.create_user(email)

        cohort = models.Cohort.objects.get(pk=cohort_id)
        (participant, _) = models.Participant.objects.get_or_create(
            user=kocherga_user,
            cohort=cohort,
        )

        return participant


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Group
        fields = (
            'id',
            'telegram_invite_link',
            'participants',
        )

    participants = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
