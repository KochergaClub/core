from kocherga.graphql import g, django_utils, helpers

from kocherga.staff.schema import types as staff_types

from ... import models


ZadarmaCall = django_utils.DjangoObjectType(
    'ZadarmaCall',
    model=models.Call,
    db_fields=[
        'call_id',
        'ts',
        'call_type',
        'disposition',
        'clid',
        'destination',
        'sip',
        'is_recorded',
        'watchman',
    ],
    extra_fields=lambda: {'record': record_field()},
)


def record_field():
    def resolve(obj, info):
        return obj.record.url if obj.record else None

    return g.Field(g.String, resolve=resolve)


ZadarmaData = g.ObjectType(
    'ZadarmaData', fields=g.fields({'staff_member': staff_types.StaffMember})
)

ZadarmaPbxCall = django_utils.DjangoObjectType(
    'ZadarmaPbxCall',
    model=models.PbxCall,
    db_fields=['pbx_call_id', 'ts'],
    related_fields={'calls': ZadarmaCall},
    extra_fields={'data': ZadarmaData},
)

ZadarmaPbxCallConnection = helpers.ConnectionType(ZadarmaPbxCall)
