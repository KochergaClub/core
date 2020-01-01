from ariadne import MutationType

from django.contrib.auth import models as auth_models, get_user_model

Mutation = MutationType()


@Mutation.field("authAddUserToGroup")
def resolve_authAddUserToGroup(_, info, group_id, user_id):
    group = auth_models.Group.objects.get(pk=group_id)
    user = get_user_model().objects.get(pk=user_id)
    group.user_set.add(user)
    return True


@Mutation.field("authRemoveUserFromGroup")
def resolve_authRemoveUserFromGroup(_, info, group_id, user_id):
    group = auth_models.Group.objects.get(pk=group_id)
    user = get_user_model().objects.get(pk=user_id)
    group.user_set.remove(user)
    return True
