from typing import Optional
from kocherga.graphql import helpers, django_utils

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


@c.class_field
class updateCommunityLead(django_utils.UpdateMutation):
    permissions = [permissions.manage_crm]
    model = models.Lead
    fields = ['name', 'description']
    result_type = types.CommunityLead


@c.class_field
class deleteCommunityLead(django_utils.DeleteMutation):
    permissions = [permissions.manage_crm]
    model = models.Lead


mutations = c.as_dict()
