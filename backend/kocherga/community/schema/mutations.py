from kocherga.graphql import django_utils, g, helpers

from .. import models, permissions
from . import types

c = helpers.Collection()


@c.class_field
class createCommunityLead(django_utils.CreateMutation):
    permissions = [permissions.manage_crm]
    model = models.Lead
    fields = ['name', 'description', 'status']
    result_type = types.CommunityLead

    def prepare_params(self, params, info):
        return {'created_by': info.context.user, **params}


@c.class_field
class updateCommunityLead(django_utils.UpdateMutation):
    permissions = [permissions.manage_crm]
    model = models.Lead
    fields = ['name', 'description', 'status']
    result_type = types.CommunityLead


@c.class_field
class deleteCommunityLead(django_utils.DeleteMutation):
    permissions = [permissions.manage_crm]
    model = models.Lead


@c.class_field
class becomeCommunityLeadCurator(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    model = models.Lead

    def resolve(self, _, info, input):
        obj = self.model.objects.get(id=input['id'])
        obj.curated_by = info.context.user
        obj.full_clean()
        obj.save()
        return obj

    input = {
        'id': 'ID!',
    }
    permissions = [permissions.manage_crm]
    result_types = {model: types.CommunityLead}


@c.class_field
class clearCommunityLeadCurator(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    model = models.Lead

    def resolve(self, _, info, input):
        obj = self.model.objects.get(id=input['id'])
        obj.curated_by = None
        obj.full_clean()
        obj.save()
        return obj

    input = {
        'id': 'ID!',
    }
    permissions = [permissions.manage_crm]
    result_types = {model: types.CommunityLead}


@c.class_field
class commentOnCommunityLead(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    model = models.Lead

    def resolve(self, _, info, input):
        obj = self.model.objects.get(id=input['lead_id'])
        obj.create_comment(info.context.user, input['text'])
        return obj

    permissions = [permissions.manage_crm]
    input = {
        'lead_id': 'ID!',
        'text': str,
    }
    result_types = {model: types.CommunityLead}


mutations = c.as_dict()
