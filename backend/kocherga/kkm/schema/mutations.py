from typing import Optional

from kocherga.graphql import basic_types, g, helpers
from kocherga.graphql.permissions import user_perm

from .. import kkmserver

c = helpers.Collection()


@c.class_field
class kkmRegisterCheck(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        return kkmserver.execute(
            kkmserver.getCheckRequest(
                kkmserver.OnlineCheck(
                    email=params['email'],
                    title=params['title'],
                    sum=params['sum'],
                    signMethodCalculation=kkmserver.SignMethodCalculation(
                        params['sign_method_calculation']
                    ),
                )
            )
        )

    permissions = [user_perm('kkm.kkmserver')]
    input = {
        'email': str,
        'title': str,
        'sum': int,
        'sign_method_calculation': int,
    }
    input_argument_name = 'params'  # TODO

    result = {
        'status': int,
        'url': Optional[str],
        'error': Optional[str],
    }


@c.class_field
class closeKkmShift(helpers.BaseField):
    def resolve(self, _, info):
        return kkmserver.execute(kkmserver.getCloseShiftRequest())
        return {'ok': True}

    permissions = [user_perm('kkm.kkmserver')]

    result = g.NN(basic_types.BasicResult)


mutations = c.as_dict()
