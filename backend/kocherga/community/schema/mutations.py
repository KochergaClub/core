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

    permissions = [permissions.manage_crm]
    input = {
        'lead_id': 'ID!',
        'text': str,
    }
    result_types = {model: types.CommunityLead}

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


# Initiatives


@c.class_field
class createCommunityInitiative(django_utils.CreateMutation):
    permissions = [permissions.manage_crm]
    model = models.Initiative
    fields = ['title', 'description']
    result_type = types.CommunityInitiative

    def prepare_params(self, params, info):
        return {'created_by': info.context.user, **params}


@c.class_field
class updateCommunityInitiative(django_utils.UpdateMutation):
    permissions = [permissions.manage_crm]
    model = models.Initiative
    fields = ['title', 'description', 'status']
    result_type = types.CommunityInitiative


@c.class_field
class deleteCommunityInitiative(django_utils.DeleteMutation):
    permissions = [permissions.manage_crm]
    model = models.Initiative


@c.class_field
class addLeadToCommunityInitiative(
    django_utils.SmartMutationMixin, helpers.BaseFieldWithInput
):
    def smart_resolve(self, _, info, input):
        initiative = models.Initiative.objects.get(pk=input['initiative_id'])
        lead = models.Lead.objects.get(pk=input['lead_id'])
        initiative.leads.add(lead)
        return initiative

    input = {
        'initiative_id': 'ID!',
        'lead_id': 'ID!',
    }
    permissions = [permissions.manage_crm]
    ok_result = types.CommunityInitiative


@c.class_field
class removeLeadFromCommunityInitiative(
    django_utils.SmartMutationMixin, helpers.BaseFieldWithInput
):
    def smart_resolve(self, _, info, input):
        initiative = models.Initiative.objects.get(pk=input['initiative_id'])
        lead = models.Lead.objects.get(pk=input['lead_id'])
        initiative.leads.remove(lead)
        return initiative

    input = {
        'initiative_id': 'ID!',
        'lead_id': 'ID!',
    }
    permissions = [permissions.manage_crm]
    ok_result = types.CommunityInitiative


@c.class_field
class commentOnCommunityInitiative(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    model = models.Initiative

    permissions = [permissions.manage_crm]
    input = {
        'initiative_id': 'ID!',
        'text': str,
    }
    result_types = {model: types.CommunityInitiative}

    def resolve(self, _, info, input):
        initiative = self.model.objects.get(id=input['initiative_id'])
        comment_text = input['text']
        initiative.create_comment(info.context.user, comment_text)
        kocherga.slack.channels.notify(
            channel="#community_crm",
            text=f'Новый комментарий: {settings.KOCHERGA_WEBSITE}/events/manage/initiatives',
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
                            "text": f"*Инициатива:* {initiative.title}",
                        },
                        {
                            "type": "mrkdwn",
                            "text": f"*Комментарий от:* {info.context.user.get_full_name()}",
                        },
                    ],
                },
            ],
        )
        return initiative


mutations = c.as_dict()
