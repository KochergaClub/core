from kocherga.graphql import g, permissions, helpers

from .. import models
from . import types


c = helpers.Collection()


@c.class_field
class staffMembersAll(helpers.BaseField):
    permissions = [permissions.staffonly]
    result = g.NNList(types.StaffMember)

    def resolve(self, _, info):
        return models.Member.objects.all()


@c.class_field
class staffMember(helpers.BaseField):
    permissions = [permissions.staffonly]
    args = {'id': 'ID!'}
    result = g.NN(types.StaffMember)

    def resolve(self, _, info):
        return models.Member.objects.get(pk=id)


queries = c.as_dict()
