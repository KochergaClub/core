from kocherga.graphql import helpers, django_utils

from .. import models

CommunityLead = django_utils.DjangoObjectType(
    'CommunityLead',
    model=models.Lead,
    db_fields=['id', 'name', 'description', 'created', 'updated'],
)

CommunityLeadConnection = helpers.ConnectionType(CommunityLead)
