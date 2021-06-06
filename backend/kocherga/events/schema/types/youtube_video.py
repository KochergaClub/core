from kocherga.graphql.django_utils import DjangoObjectType

from ... import models

EventsYoutubeVideo = DjangoObjectType(
    'EventsYoutubeVideo',
    model=models.YoutubeVideo,
    db_fields=['id', 'embed_id'],
    # TODO - event field
)
