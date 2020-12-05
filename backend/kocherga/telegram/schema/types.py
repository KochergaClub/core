from kocherga.graphql import django_utils
from kocherga.wagtail import graphql_utils as wagtail_utils

from .. import models


def TelegramChat_extra_fields():
    from kocherga.projects.schema.types import ProjectPage

    return {
        'photo': wagtail_utils.image_rendition_field(models.Chat, 'photo'),
        'project': ProjectPage,
        'link': str,
    }


TelegramChat = django_utils.DjangoObjectType(
    'TelegramChat',
    model=models.Chat,
    db_fields=['id', 'username', 'title'],
    extra_fields=TelegramChat_extra_fields,
)
