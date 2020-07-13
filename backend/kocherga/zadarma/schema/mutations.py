from kocherga.graphql import helpers
from kocherga.graphql.permissions import user_perm

from .. import models

c = helpers.Collection()


@c.class_field
class zadarmaSetMemberForPbxCall(helpers.BaseField):
    permissions = [user_perm('zadarma.admin')]
    args = {'member_id': 'ID!', 'pbx_call_id': 'ID!'}
    result = bool

    def resolve(self, _, info, pbx_call_id, member_id):
        pbx_call = models.PbxCall.objects.get(pk=pbx_call_id)
        pbx_call.set_staff_member_by_id(member_id)
        return True


mutations = c.as_dict()
