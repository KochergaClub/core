import datetime

from kocherga.graphql import basic_types, django_utils, g, helpers
from kocherga.graphql.permissions import user_perm

from ... import models
from .. import types

c = helpers.Collection()


@c.class_field
class createRatioTraining(django_utils.CreateMutation):
    model = models.Training
    fields = [
        'name',
        'slug',
        'training_type',
        'date',
        'telegram_link',
        'discount_by_email',
        'discount_percent_by_email',
    ]
    permissions = [user_perm('ratio.manage')]
    result_type = types.RatioTraining

    def prepare_params(self, params, info):
        result = {**params}
        if 'date' in params:
            date_str = params['date']
            result['date'] = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
        return result


@c.class_field
class updateRatioTraining(django_utils.UpdateMutation):
    model = models.Training
    fields = [
        'name',
        # 'slug',
        'training_type',
        'date',
        'telegram_link',
        'discount_by_email',
        'discount_percent_by_email',
        'promocode_email',
        'new_ticket_email',
        'notion_created_email',
    ]
    permissions = [user_perm('ratio.manage')]
    result_type = types.RatioTraining


@c.class_field
class ratioDeleteTraining(helpers.BaseFieldWithInput):
    # TODO - reimplement with django_utils.DeleteMutation after we implement lookup_field in DeleteMutation
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
