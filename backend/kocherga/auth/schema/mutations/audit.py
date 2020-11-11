import logging

from kocherga.auth.utils import perm_to_permission

logger = logging.getLogger(__name__)

from django.contrib.auth import get_user_model
from django.contrib.auth import models as auth_models
from kocherga.graphql import basic_types, g, helpers
from kocherga.graphql.permissions import user_perm

from .. import types

c = helpers.Collection()


# TODO - rename to addUserToAuthGroup
@c.class_field
class authAddUserToGroup(helpers.BaseField):
    def resolve(self, _, info, group_id, user_id):
        group = auth_models.Group.objects.get(pk=group_id)
        user = get_user_model().objects.get(pk=user_id)
        group.user_set.add(user)
        return True

    permissions = [user_perm('auth.audit')]
    args = {'group_id': 'ID!', 'user_id': 'ID!'}
    result = bool


# TODO - rename to removeUserFromAuthGroup
@c.class_field
class authRemoveUserFromGroup(helpers.BaseField):
    def resolve(self, _, info, group_id, user_id):
        group = auth_models.Group.objects.get(pk=group_id)
        user = get_user_model().objects.get(pk=user_id)
        group.user_set.remove(user)
        return True

    permissions = [user_perm('auth.audit')]
    args = {'group_id': 'ID!', 'user_id': 'ID!'}
    result = bool


@c.class_field
class createAuthGroup(helpers.BaseField):
    def resolve(self, _, info, name):
        group = auth_models.Group.objects.create(name=name)
        group.full_clean()
        return group

    permissions = [user_perm('auth.audit')]
    args = {'name': str}
    result = g.NN(types.AuthGroup)


@c.class_field
class deleteAuthGroup(helpers.BaseField):
    def resolve(self, _, info, id):
        group = auth_models.Group.objects.get(pk=id)
        group.delete()
        return {'ok': True}

    permissions = [user_perm('auth.audit')]
    args = {'id': 'ID!'}
    result = g.NN(basic_types.BasicResult)


@c.class_field
class addPermissionToAuthGroup(helpers.BaseField):
    def resolve(self, _, info, group_id, perm):
        group = auth_models.Group.objects.get(pk=group_id)
        permission = perm_to_permission(perm)
        group.permissions.add(permission)
        return group

    permissions = [user_perm('auth.audit')]
    args = {'group_id': 'ID!', 'perm': str}
    result = g.NN(types.AuthGroup)


@c.class_field
class removePermissionFromAuthGroup(helpers.BaseField):
    def resolve(self, _, info, group_id, perm):
        group = auth_models.Group.objects.get(pk=group_id)
        permission = perm_to_permission(perm)
        group.permissions.remove(permission)
        return group

    permissions = [user_perm('auth.audit')]
    args = {'group_id': 'ID!', 'perm': str}
    result = g.NN(types.AuthGroup)


mutations = c.as_dict()
