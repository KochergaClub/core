from ariadne import MutationType

from .. import models

Mutation = MutationType()


@Mutation.field('staffGrantGooglePermissionsToMember')
def resolve_grant_google_permissions(obj, info, id):
    member = models.Member.objects.get(pk=id)
    member.grant_google_permissions()
    return True


@Mutation.field('staffFireMember')
def resolve_fire_member(obj, info, id):
    member = models.Member.objects.get(pk=id)
    member.fire()
    return True


@Mutation.field('staffUnfireMember')
def resolve_unfire_member(obj, info, id):
    member = models.Member.objects.get(pk=id)
    member.unfire()
    return True
