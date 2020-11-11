import logging

logger = logging.getLogger(__name__)

from typing import Optional

from kocherga.graphql import g, helpers
from kocherga.graphql.basic_types import BasicResult

from ... import models, permissions
from ..types import EventsFeedback

c = helpers.Collection()


@c.class_field
class eventsFeedbackCreate(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        params = {**input}

        event = models.Event.objects.get(uuid=params['event_id'])
        params['event'] = event
        del params['event_id']

        feedback = models.Feedback.objects.create(**params)

        return {
            'ok': True,
            'feedback': feedback,
        }

    permissions = [permissions.manage_events]
    input = {
        'event_id': 'ID!',
        'overall_score': Optional[int],
        'recommend_score': Optional[int],
        'content_score': Optional[int],
        'conductor_score': Optional[int],
        'source_friend': bool,
        'source_vk': bool,
        'source_fb': bool,
        'source_timepad': bool,
        'source_email': bool,
        'source_website': bool,
        'custom_source': Optional[str],
        'comment': Optional[str],
    }

    result = {
        'ok': Optional[bool],
        'feedback': g.NN(EventsFeedback),
    }


@c.class_field
class eventsFeedbackDelete(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        id = input['id']
        models.Feedback.objects.get(pk=id).delete()

        return {'ok': True}

    permissions = [permissions.manage_events]
    input = {
        'id': 'ID!',
    }
    result = g.NN(BasicResult)


mutations = c.as_dict()
