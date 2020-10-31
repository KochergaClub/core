from typing import Optional
import datetime

from kocherga.graphql import g, helpers, basic_types
from kocherga.graphql.permissions import user_perm

from .. import types
from ... import models


c = helpers.Collection()


@c.class_field
class ratioAddTraining(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        date = None
        if 'date' in params:
            date_str = params['date']
            date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()

        return models.Training.objects.create(
            name=params['name'],
            slug=params['slug'],
            date=date,
            telegram_link=params.get('telegram_link', ''),
        )

    permissions = [user_perm('ratio.manage')]
    input = {
        'name': str,
        'slug': str,
        'date': Optional[str],
        'telegram_link': Optional[str],
    }
    input_argument_name = 'params'  # TODO

    result = g.NN(types.RatioTraining)


@c.class_field
class ratioDeleteTraining(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        training = models.Training.objects.get(slug=input['slug'])
        training.delete()
        return {'ok': True}

    permissions = [user_perm('ratio.manage')]
    input = {
        'slug': str,
    }

    result = g.NN(basic_types.BasicResult)


mutations = c.as_dict()
