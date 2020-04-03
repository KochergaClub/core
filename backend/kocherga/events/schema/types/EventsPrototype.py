from datetime import datetime

from kocherga.dateutils import TZ
from kocherga.graphql.types import DjangoObjectType

from ...import models

EventsPrototype = DjangoObjectType('EventsPrototype', models.EventPrototype)


EventsPrototype.set_alias('id', 'prototype_id')


@EventsPrototype.field('suggested_dates')
def resolve_suggested_dates(obj, info, limit, until_ts=None):
    if until_ts:
        until_ts = datetime.fromtimestamp(until_ts, tz=TZ)
    return obj.suggested_dates(until=until_ts, limit=limit)
