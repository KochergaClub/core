import logging
from dataclasses import dataclass

from kocherga.graphql import basic_types, g, helpers
from kocherga.graphql.permissions import user_perm
import kocherga.django.errors
import kocherga.django.schema.types

from .. import models, kkmserver
from . import types

logger = logging.getLogger(__name__)

c = helpers.Collection()


@dataclass
class RegisterCheckOkResult:
    url: str


@c.class_field
class kkmRegisterCheck(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        controller: models.Controller = models.Controller.load()
        result = controller.register_check(
            email=input['email'],
            title=input['title'],
            sum=input['sum'],
            sign_method_calculation=kkmserver.SignMethodCalculation[
                input['sign_method_calculation']
            ],
        )

        # status values:
        # Ok = 0, Run(Запущено на выполнение) = 1, Error = 2, NotFound(устройство не найдено) = 3, NotRun = 4

        if result['Status'] == 0:
            return RegisterCheckOkResult(url=result['URL'])

        error = result.get('Error', 'Неизвестная ошибка')
        return kocherga.django.errors.GenericError(
            f"{error} (status: {result['Status']})"
        )

    permissions = [user_perm('kkm.kkmserver')]
    input = {
        'email': str,
        'title': str,
        'sum': int,
        'sign_method_calculation': g.NN(types.KkmSignMethodCalculation),
    }

    OkResultType = g.ObjectType(
        'KkmRegisterCheckOkResult',
        g.fields(
            {
                'url': str,
            }
        ),
    )

    result_types = {
        RegisterCheckOkResult: OkResultType,
        kocherga.django.errors.GenericError: kocherga.django.schema.types.GenericError,
    }


@c.class_field
class closeKkmShift(helpers.BaseField):
    def resolve(self, _, info):
        models.Controller.load().close_shift()
        return {'ok': True}

    permissions = [user_perm('kkm.kkmserver')]

    result = g.NN(basic_types.BasicResult)


mutations = c.as_dict()
