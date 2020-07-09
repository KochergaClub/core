from kocherga.graphql import g
from kocherga.graphql.helpers import Collection
from kocherga.graphql.decorators import auth

from .. import models


c = Collection()


@c.field
def staffGrantGooglePermissionsToMember(helper):
    @auth(permission='staff.manage')
    def resolve(obj, info, id):
        member = models.Member.objects.get(pk=id)
        member.grant_google_permissions()
        return True

    return g.Field(g.Boolean, args=g.arguments({'id': 'ID!'}), resolve=resolve)


@c.field
def staffFireMember(helper):
    @auth(permission='staff.manage')
    def resolve(obj, info, id):
        member = models.Member.objects.get(pk=id)
        member.fire()
        return True

    return g.Field(g.Boolean, args=g.arguments({'id': 'ID!'}), resolve=resolve)


# staffUnfireMember(id: ID!): Boolean @auth(permission: "staff.manage")
@c.field
def staffUnfireMember(helper):
    @auth(permission='staff.manage')
    def resolve(obj, info, id):
        member = models.Member.objects.get(pk=id)
        member.unfire()
        return True

    return g.Field(g.Boolean, args=g.arguments({'id': 'ID!'}), resolve=resolve)


mutations = c.as_dict()
