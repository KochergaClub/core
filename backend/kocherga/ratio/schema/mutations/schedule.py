import datetime

from kocherga.graphql import helpers
from kocherga.graphql.permissions import user_perm

from ... import models

c = helpers.Collection()


@c.class_field
class ratioTrainingCopyScheduleFrom(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        from_training = models.Training.objects.get(slug=input['from_training_slug'])
        to_training = models.Training.objects.get(slug=input['to_training_slug'])
        to_training.copy_schedule_from(from_training)
        return True

    permissions = [user_perm('ratio.manage')]
    input = {
        'from_training_slug': str,
        'to_training_slug': str,
    }

    result = bool


@c.class_field
class ratioTrainingAddDay(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        training = models.Training.objects.get(slug=input['training_slug'])
        date_str = input['date']
        date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
        training.add_day(date)
        return True

    permissions = [user_perm('ratio.manage')]
    input = {
        'training_slug': str,
        'date': str,
    }

    result = bool


mutations = c.as_dict()
