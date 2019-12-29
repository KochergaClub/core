import graphene
from graphene_django.types import DjangoObjectType

from kocherga.django.schema_utils import require_staff, require_permission, Ok, NNList

from . import models

from kocherga.auth.schema import AuthUser
from kocherga.slack.schema import SlackUser


class StaffMember(DjangoObjectType):
    class Meta:
        model = models.Member
        fields = (
            'id',
            'user',
            'slack_user',
            'is_current',
            'short_name',
            'full_name',
            'role',
            'color',
            'vk',
        )

    user = graphene.Field(AuthUser, required=True)

    @require_staff
    def resolve_user(self, info):
        return self.user

    slack_user = graphene.Field(SlackUser)

    @require_staff
    def resolve_slack_user(self, info):
        return self.slack_user


class Query:
    staffMembersAll = NNList(StaffMember)

    @require_staff
    def resolve_staffMembersAll(self, info):
        return models.Member.objects.all()

    staffMember = graphene.Field(graphene.NonNull(StaffMember), id=graphene.ID(required=True))

    @require_staff
    def resolve_staffMember(self, info, id):
        return models.Member.objects.get(pk=id)


class StaffGrantGooglePermissionsToMemberMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    Output = Ok

    @require_permission('staff.manage')
    def mutate(self, info, id):
        member = models.Member.objects.get(pk=id)
        member.grant_google_permissions()
        return Ok(ok=True)


class StaffFireMemberMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    Output = Ok

    @require_permission('staff.manage')
    def mutate(self, info, id):
        member = models.Member.objects.get(pk=id)
        member.fire()
        return Ok(ok=True)


class Mutation:
    staffGrantGooglePermissionsToMember = StaffGrantGooglePermissionsToMemberMutation.Field()
    staffFireMember = StaffFireMemberMutation.Field()
