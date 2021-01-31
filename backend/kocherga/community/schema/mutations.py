import kocherga.slack.channels
from django.conf import settings
from kocherga.events import models as event_models
from kocherga.graphql import django_utils, helpers

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
        lead = self.model.objects.get(id=input['lead_id'])
        comment_text = input['text']
        lead.create_comment(info.context.user, comment_text)
        kocherga.slack.channels.notify(
            channel="#community_crm",
            text=f'Новый комментарий: {settings.KOCHERGA_WEBSITE}/events/manage/leads',
            blocks=[
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": comment_text,
                    },
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": f"*Лид:* {lead.name}",
                        },
                        {
                            "type": "mrkdwn",
                            "text": f"*Комментарий от:* {info.context.user.get_full_name()}",
                        },
                    ],
                },
            ],
        )
        return lead

    permissions = [permissions.manage_crm]
    input = {
        'lead_id': 'ID!',
        'text': str,
    }
    result_types = {model: types.CommunityLead}


# TODO: implement generic Mutation class, e.g.:
# @c.class_field
# class commentOnCommunityLead(comment_utils.CreateCommentMutation):
#     model = models.Lead
#     permissions = [permissions.manage_crm]
#     graphql_field = 'lead_id'
#     model_field = 'pk'
#     result_type = types.CommunityLead


mutations = c.as_dict()
