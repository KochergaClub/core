from ariadne import ObjectType

from kocherga.graphql.utils import require_staff

StaffMember = ObjectType('StaffMember')


@StaffMember.field('user')
@require_staff
def resolve_user(obj, info):
    return obj.user


@StaffMember.field('slack_user')
@require_staff
def resolve_slack_user(obj, info):
    return obj.slack_user
