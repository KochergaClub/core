from kocherga.graphql import g, django_utils

from ... import models

EventsGoogleEvent = django_utils.DjangoObjectType(
    'EventsGoogleEvent',
    model=models.GoogleEvent,
    db_fields=['google_id', 'html_link'],
    extra_fields={
        'id': g.Field(g.NN(g.ID), resolve=lambda obj, info: obj.google_id)
    },  # avoid leaking integer ids to public
)
