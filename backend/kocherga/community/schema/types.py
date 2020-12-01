from kocherga.auth.schema import types as auth_types
from kocherga.graphql import django_utils, helpers

from .. import models

CommunityLead = django_utils.DjangoObjectType(
    'CommunityLead',
    model=models.Lead,
    db_fields=['id', 'name', 'description', 'created', 'updated'],
    extra_fields={
        'created_by': auth_types.AuthUser,
    },
)

CommunityLeadConnection = helpers.ConnectionType(CommunityLead)
