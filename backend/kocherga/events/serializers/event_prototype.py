from rest_framework import serializers

from kocherga.dateutils import dts

import kocherga.projects.models

from .. import models

FIELDS = (
    'prototype_id',
    'project_slug',
    'title',
    'location',
    'summary',
    'description',
    'timepad_category_code',
    'timepad_prepaid_tickets',
    'timing_description_override',
    'vk_group',
    'fb_group',
    'weekday',
    'hour',
    'minute',
    'length',
    'image',
    'active',
    'canceled_dates',
    'tags',
)


class EventPrototypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventPrototype
        fields = FIELDS
        read_only_fields = ('image', 'canceled_dates')

    project_slug = serializers.CharField(
        source='project.slug', required=False, allow_blank=True
    )

    tags = serializers.SerializerMethodField()

    def get_tags(self, obj):
        return obj.tag_names()

    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return obj.image.get_rendition('original').url
        else:
            return None

    def update(self, instance, validated_data):
        project_data = validated_data.pop('project', None)
        prototype = super().update(instance, validated_data)

        if project_data:
            project_slug = project_data['slug']
            if project_slug == '':
                prototype.project = None
            else:
                prototype.project = kocherga.projects.models.ProjectPage.objects.get(
                    slug=project_slug
                )
            prototype.save()

        return prototype


# This serializer is not really necessary since we've removed its `instances` field.
# But it still provides `suggested` field which depends on instances. Huh.
# TODO - think about this some more and redesign the APIs.
class DetailedEventPrototypeSerializer(EventPrototypeSerializer):
    class Meta:
        model = models.EventPrototype
        fields = FIELDS + ('suggested',)
        read_only_fields = ('image', 'canceled_dates')

    suggested = serializers.SerializerMethodField()

    def get_suggested(self, obj):
        return [dts(dt) for dt in obj.suggested_dates(limit=5)]
