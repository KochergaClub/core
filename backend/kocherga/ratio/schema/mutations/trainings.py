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
            discount_by_email=params.get('discount_by_email', 0),
            discount_percent_by_email=params.get('discount_percent_by_email', 0),
        )

    permissions = [user_perm('ratio.manage')]
    input = {
        'name': str,
        'slug': str,
        'date': Optional[str],
        'telegram_link': Optional[str],
        'discount_by_email': Optional[int],
        'discount_percent_by_email': Optional[int],
    }
    input_argument_name = 'params'  # TODO

    result = g.NN(types.RatioTraining)


@c.class_field
class updateRatioTraining(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        training = models.Training.objects.get(pk=input['id'])

        for field in (
            'name',
            # 'slug',
            'date',
            'telegram_link',
            'discount_by_email',
            'discount_percent_by_email',
        ):
            if input.get(field) is not None:
                setattr(training, field, input[field])

        training.full_clean()
        training.save()
        return training

    permissions = [user_perm('ratio.manage')]
    input = {
        'id': 'ID!',
        'name': str,
        # 'slug': str,
        'date': Optional[str],
        'telegram_link': Optional[str],
        'discount_by_email': Optional[int],
        'discount_percent_by_email': Optional[int],
    }

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
