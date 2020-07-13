from kocherga.graphql.permissions import user_perm, check_permissions
from kocherga.graphql import g, helpers

from .. import models


c = helpers.Collection()


@c.field
def staffGrantGooglePermissionsToMember(helper):
    @check_permissions([user_perm('staff.manage')])
    def resolve(obj, info, id):
        member = models.Member.objects.get(pk=id)
        member.grant_google_permissions()
        return True

    return g.Field(g.Boolean, args=g.arguments({'id': 'ID!'}), resolve=resolve)


@c.field
def staffFireMember(helper):
    @check_permissions([user_perm('staff.manage')])
    def resolve(obj, info, id):
        member = models.Member.objects.get(pk=id)
        member.fire()
        return True

    return g.Field(g.Boolean, args=g.arguments({'id': 'ID!'}), resolve=resolve)


@c.field
def staffUnfireMember(helper):
    @check_permissions([user_perm('staff.manage')])
    def resolve(obj, info, id):
        member = models.Member.objects.get(pk=id)
        member.unfire()
        return True

    return g.Field(g.Boolean, args=g.arguments({'id': 'ID!'}), resolve=resolve)


mutations = c.as_dict()
