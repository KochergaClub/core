import logging
logger = logging.getLogger(__name__)

import graphene
from graphene_django.types import DjangoObjectType

from django.contrib.auth import models as auth_models
from django.contrib.auth import get_user_model

from kocherga.django.schema_utils import require_permission, Ok, NNList


class AuthCurrentUser(graphene.ObjectType):
    is_authenticated = graphene.Boolean(required=True)
    email = graphene.String()
    is_staff = graphene.Boolean()

    permissions = NNList(graphene.String)

    def resolve_permissions(self, info):
        return self.get_all_permissions()


class AuthUser(DjangoObjectType):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'staff_member')


class AuthPermission(DjangoObjectType):
    class Meta:
        model = auth_models.Permission
        fields = ('id', 'name')

    users = NNList(AuthUser)

    def resolve_users(self, info):
        return self.user_set.all()


class AuthGroup(DjangoObjectType):
    class Meta:
        model = auth_models.Group
        fields = ('id', 'name', 'permissions')

    users = NNList(AuthUser)

    def resolve_users(self, info):
        return self.user_set.all()


class Query:
    currentUser = graphene.Field(AuthCurrentUser, required=True)

    def resolve_currentUser(self, info):
        return info.context.user

    authGroupsAll = NNList(AuthGroup)

    @require_permission('auth.audit')
    def resolve_authGroupsAll(self, info):
        return auth_models.Group.objects.all()

    authPermissionsAll = NNList(AuthPermission)

    @require_permission('auth.audit')
    def resolve_authPermissionsAll(self, info):
        return auth_models.Permission.objects.all()


class AuthAddUserToGroupMutation(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        group_id = graphene.ID(required=True)

    Output = Ok

    @require_permission('auth.audit')
    def mutate(self, info, user_id, group_id):
        group = auth_models.Group.objects.get(pk=group_id)
        user = get_user_model().objects.get(pk=user_id)
        group.user_set.add(user)
        return Ok(ok=True)


class AuthRemoveUserFromGroupMutation(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        group_id = graphene.ID(required=True)

    Output = Ok

    @require_permission('auth.audit')
    def mutate(self, info, user_id, group_id):
        group = auth_models.Group.objects.get(pk=group_id)
        user = get_user_model().objects.get(pk=user_id)
        group.user_set.remove(user)
        return Ok(ok=True)


class Mutation:
    authAddUserToGroup = AuthAddUserToGroupMutation.Field()
    authRemoveUserFromGroup = AuthRemoveUserFromGroupMutation.Field()
