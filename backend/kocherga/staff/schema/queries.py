from kocherga.graphql import g
from kocherga.graphql.helpers import Collection
from kocherga.graphql.decorators import staffonly
from .. import models
from . import types


c = Collection()


@c.field
def staffMembersAll(helper):
    # staffMembersAll: [StaffMember!]! @staffonly
    @staffonly
    def resolve(_, info):
        return models.Member.objects.all()

    return g.Field(g.NNList(types.StaffMember), resolve=resolve)


@c.field
def staffMember(helper):
    # staffMember(id: ID!): StaffMember! @staffonly
    @staffonly
    def resolve(_, info, id):
        return models.Member.objects.get(pk=id)

    return g.Field(g.NN(types.StaffMember), args={'id': g.NN(g.ID)}, resolve=resolve)


queries = c.as_dict()
