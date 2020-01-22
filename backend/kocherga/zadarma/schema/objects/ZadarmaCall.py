from kocherga.graphql.types import DjangoObjectType

from ... import models

ZadarmaCall = DjangoObjectType('ZadarmaCall', models.ZadarmaCall)


@ZadarmaCall.field('record')
def resolve_record(obj, info):
    return obj.record.url if obj.record else None
