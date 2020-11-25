from typing import Optional
from kocherga.graphql import helpers

from .. import models, permissions
from . import types

c = helpers.Collection()


@c.class_field
class createCommunityLead(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        lead = models.Lead.objects.create(
            name=input['name'],
            description=input.get('description', ''),
            created_by=info.context.user,
        )
        lead.full_clean()
        return lead

    permissions = [permissions.manage_crm]
    input = {
        'name': str,
        'description': Optional[str],
    }
    result_types = {models.Lead: types.CommunityLead}


mutations = c.as_dict()
