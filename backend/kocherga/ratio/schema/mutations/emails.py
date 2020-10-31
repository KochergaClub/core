from kocherga.graphql import helpers
from kocherga.graphql.permissions import user_perm

from ... import models
from ... import email
from ...users import training2mailchimp

c = helpers.Collection()


@c.class_field
class ratioTrainingSyncParticipantsToMailchimp(helpers.BaseField):
    def resolve(self, _, info, training_id):
        training = models.Training.objects.get(pk=training_id)
        training2mailchimp(training)
        return True

    permissions = [user_perm('ratio.manage')]
    args = {'training_id': 'ID!'}
    result = bool


@c.class_field
class ratioTrainingSendEmail(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        training = models.Training.objects.get(pk=input['training_id'])
        title = input['title']
        content = input['content']
        result = email.create_any_draft(training, title, content)
        return {
            'draft_link': result['draft_link'],
        }

    permissions = [user_perm('ratio.manage')]
    input = {
        'training_id': 'ID!',
        'title': str,
        'content': str,
    }

    result = {
        'draft_link': str,
    }


mutations = c.as_dict()
