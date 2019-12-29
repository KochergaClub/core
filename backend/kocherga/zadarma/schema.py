import graphene
from graphene_django.types import DjangoObjectType

from kocherga.django.schema_utils import require_staff, require_permission, Ok, NonNullConnection

from . import models


class ZadarmaData(DjangoObjectType):
    class Meta:
        model = models.PbxCallData
        fields = ('staff_member',)


class ZadarmaCall(DjangoObjectType):
    class Meta:
        model = models.Call
        fields = (
            'ts', 'call_id',
            'call_type', 'disposition', 'is_recorded', 'record', 'watchman', 'sip', 'destination', 'clid'
        )


class ZadarmaPbxCall(DjangoObjectType):
    class Meta:
        model = models.PbxCall
        fields = ('pbx_call_id', 'ts', 'calls', 'data')
        interfaces = (graphene.relay.Node,)

    @classmethod
    def get_queryset(cls, queryset, info):
        if not info.context.user.has_perm('zadarma.admin'):
            queryset = queryset.filter(data__staff_member__user__pk=info.context.user.pk)
        return queryset


class ZadarmaPbxCallConnection(NonNullConnection):
    class Meta:
        node = ZadarmaPbxCall


class Query:
    zadarmaPbxCalls = graphene.relay.ConnectionField(ZadarmaPbxCallConnection, required=True)

    @require_staff
    def resolve_zadarmaPbxCalls(self, info, **kwargs):
        return models.PbxCall.objects.all()

    zadarmaPbxCall = graphene.Field(graphene.NonNull(ZadarmaPbxCall), pbx_call_id=graphene.ID(required=True))

    @require_staff
    def resolve_zadarmaPbxCall(self, info, pbx_call_id):
        return models.PbxCall.objects.get(pk=pbx_call_id)


class ZadarmaSetMemberForPbxCallMutation(graphene.Mutation):
    class Arguments:
        pbx_call_id = graphene.ID(required=True)
        member_id = graphene.ID(required=True)

    Output = Ok

    @require_permission('zadarma.admin')
    def mutate(self, info, pbx_call_id, member_id):
        pbx_call = models.PbxCall.objects.get(pk=pbx_call_id)
        pbx_call.set_staff_member_by_id(member_id)
        return Ok(ok=True)


class Mutation:
    zadarmaSetMemberForPbxCall = ZadarmaSetMemberForPbxCallMutation.Field()
    pass
