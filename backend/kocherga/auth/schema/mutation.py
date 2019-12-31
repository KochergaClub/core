from ariadne import MutationType

from django.contrib.auth import models as auth_models, get_user_model

from kocherga.django.schema_utils import require_permission

Mutation = MutationType()


@Mutation.field("authAddUserToGroup")
@require_permission('auth.audit')
def resolve_authAddUserToGroup(_, info, group_id, user_id):
    group = auth_models.Group.objects.get(pk=group_id)
    user = get_user_model().objects.get(pk=user_id)
    group.user_set.add(user)
    return True


@Mutation.field("authRemoveUserFromGroup")
@require_permission('auth.audit')
def resolve_authRemoveUserFromGroup(_, info, group_id, user_id):
    group = auth_models.Group.objects.get(pk=group_id)
    user = get_user_model().objects.get(pk=user_id)
    group.user_set.remove(user)
    return True
