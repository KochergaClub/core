from kocherga.events import models as event_models
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
class addEventToCommunityLead(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    model = models.Lead

    def resolve(self, _, info, input):
        lead = self.model.objects.get(id=input['lead_id'])
        event = event_models.Event.objects.get(uuid=input['event_id'])
        lead.events.add(event)
        return lead

    input = {
        'lead_id': 'ID!',
        'event_id': 'ID!',
    }
    permissions = [permissions.manage_crm]
    result_types = {model: types.CommunityLead}


@c.class_field
class removeEventFromCommunityLead(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    model = models.Lead

    def resolve(self, _, info, input):
        lead = self.model.objects.get(id=input['lead_id'])
        event = event_models.Event.objects.get(uuid=input['event_id'])
        lead.events.remove(event)
        return lead

    input = {
        'lead_id': 'ID!',
        'event_id': 'ID!',
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


## TODO: implement generic Mutation class, e.g.:
# @c.class_field
# class commentOnCommunityLead(comment_utils.CreateCommentMutation):
#     model = models.Lead
#     permissions = [permissions.manage_crm]
#     graphql_field = 'lead_id'
#     model_field = 'pk'
#     result_type = types.CommunityLead


mutations = c.as_dict()
