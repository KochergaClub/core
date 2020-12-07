from kocherga.auth.schema import types as auth_types
from kocherga.comments.schema.utils import (
    build_comments_count_field,
    build_comments_field,
)
from kocherga.graphql import django_utils, g, helpers

from .. import models, permissions

CommunityLeadStatus = g.EnumType('CommunityLeadStatus', models.Lead.Status)

CommunityLead = django_utils.DjangoObjectType(
    'CommunityLead',
    model=models.Lead,
    db_fields=['id', 'name', 'description', 'created', 'updated'],
    extra_fields={
        'created_by': auth_types.AuthUser,
        'curated_by': auth_types.AuthUser,
        'status': g.NN(CommunityLeadStatus),
        'comments_count': build_comments_count_field(
            permissions=[permissions.manage_crm]
        ),
        'comments': build_comments_field(permissions=[permissions.manage_crm]),
    },
)

CommunityLeadConnection = helpers.ConnectionType(CommunityLead)
