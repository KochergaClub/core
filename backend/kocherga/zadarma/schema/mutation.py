from ariadne import MutationType

from .. import models

Mutation = MutationType()


@Mutation.field('zadarmaSetMemberForPbxCall')
def resolve_zadarmaSetMemberForPbxCall(_, info, pbx_call_id, member_id):
    pbx_call = models.PbxCall.objects.get(pk=pbx_call_id)
    pbx_call.set_staff_member_by_id(member_id)
    return True
