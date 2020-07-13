from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly

from .. import models
from . import types

c = helpers.Collection()


@c.class_field
class zadarmaPbxCalls(helpers.BaseField):
    permissions = [staffonly]
    args = helpers.connection_args()
    result = g.NN(types.ZadarmaPbxCallConnection)

    def resolve(self, _, info, **pager):
        qs = models.PbxCall.objects.all()
        if not info.context.user.has_perm('zadarma.admin'):
            qs = qs.filter(data__staff_member__user__pk=info.context.user.pk)

        return qs.relay_page(order='-ts', **pager)


@c.class_field
class zadarmaPbxCall(helpers.BaseField):
    permissions = [staffonly]
    args = {'pbx_call_id': 'ID!'}
    result = g.NN(types.ZadarmaPbxCall)

    def resolve(self, _, info, pbx_call_id):
        return models.PbxCall.objects.get(pk=pbx_call_id)


queries = c.as_dict()
