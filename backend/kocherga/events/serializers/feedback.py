from rest_framework import serializers

from .. import models


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Feedback
        fields = (
            'id',
            'event_id',
            'overall_score',
            'recommend_score',
            'content_score',
            'conductor_score',
            'source_friend',
            'source_vk',
            'source_fb',
            'source_timepad',
            'source_email',
            'source_website',
            'custom_source',
            'comment',
        )
        read_only_fields = ('id',)

    event_id = serializers.SlugField(source='event.uuid')

    def create(self, validated_data):
        event_data = validated_data.pop('event')
        event = models.Event.objects.get(uuid=event_data['uuid'])

        feedback = models.Feedback.objects.create(
            event=event,
            **validated_data,
        )

        return feedback
