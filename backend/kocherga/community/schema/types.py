from kocherga.auth.schema import types as auth_types
from kocherga.graphql import django_utils, g, helpers

from .. import models

CommunityLeadStatus = g.EnumType('CommunityLeadStatus', models.Lead.Status)

CommunityLead = django_utils.DjangoObjectType(
    'CommunityLead',
    model=models.Lead,
    db_fields=['id', 'name', 'description', 'created', 'updated'],
    extra_fields={
        'created_by': auth_types.AuthUser,
        'curated_by': auth_types.AuthUser,
        'status': g.NN(CommunityLeadStatus),
    },
)

CommunityLeadConnection = helpers.ConnectionType(CommunityLead)
