import logging

logger = logging.getLogger(__name__)

from ariadne import MutationType

from ... import models

Mutation = MutationType()


@Mutation.field('eventsFeedbackCreate')
def eventsFeedbackCreate(_, info, input):
    params = {**input}

    event = models.Event.objects.get(uuid=params['event_id'])
    params['event'] = event
    del params['event_id']

    feedback = models.Feedback.objects.create(**params)

    return {
        'ok': True,
        'feedback': feedback,
    }


@Mutation.field('eventsFeedbackDelete')
def eventsFeedbackDelete(_, info, input):
    id = input['id']

    models.Feedback.objects.get(pk=id).delete()

    return {'ok': True}
