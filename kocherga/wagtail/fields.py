from wagtail.core.rich_text import expand_db_html
from wagtail.api import APIField
from rest_framework import fields


class APIRichTextSerializer(fields.CharField):
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return expand_db_html(representation)


class APIRichTextField(APIField):
    def __init__(self, name):
        serializer = APIRichTextSerializer()
        super().__init__(name=name, serializer=serializer)
