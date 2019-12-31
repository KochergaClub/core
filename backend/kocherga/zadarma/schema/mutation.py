from ariadne import MutationType

from kocherga.django.schema_utils import require_permission

from .. import models

Mutation = MutationType()


@require_permission('zadarma.admin')
@Mutation.field('zadarmaSetMemberForPbxCall')
def resolve_zadarmaSetMemberForPbxCall(_, info, pbx_call_id, member_id):
    pbx_call = models.PbxCall.objects.get(pk=pbx_call_id)
    pbx_call.set_staff_member_by_id(member_id)
    return True
