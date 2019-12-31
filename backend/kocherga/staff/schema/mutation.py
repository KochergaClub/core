from ariadne import MutationType

from kocherga.django.schema_utils import require_permission

from .. import models

Mutation = MutationType()


@Mutation.field('staffGrantGooglePermissionsToMember')
@require_permission('staff.manage')
def resolve_grant_google_permissions(obj, info, id):
    member = models.Member.objects.get(pk=id)
    member.grant_google_permissions()
    return True


@Mutation.field('staffFireMember')
@require_permission('staff.manage')
def resolve_fire_member(obj, info, id):
    member = models.Member.objects.get(pk=id)
    member.fire()
    return True
