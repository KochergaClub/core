from kocherga.graphql import helpers
from kocherga.graphql.decorators import auth

from .. import models

c = helpers.Collection()


@c.class_field
class zadarmaSetMemberForPbxCall(helpers.BaseField):
    @auth(permission='zadarma.admin')
    def resolve(self, _, info, pbx_call_id, member_id):
        pbx_call = models.PbxCall.objects.get(pk=pbx_call_id)
        pbx_call.set_staff_member_by_id(member_id)
        return True

    args = {'member_id': 'ID!', 'pbx_call_id': 'ID!'}
    result = bool


mutations = c.as_dict()
