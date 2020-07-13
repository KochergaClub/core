from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly

from .. import models
from . import types

c = helpers.Collection()


@c.class_field
class cm2CreateOrder(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        customer = None
        if 'customer' in input:
            customer = models.Customer.objects.get(pk=input['customer'])

        return models.Order.objects.create(customer=customer)

    permissions = [staffonly]
    input = {'customer': 'ID'}
    result = g.NN(types.Cm2Order)


@c.class_field
class cm2CreateCustomer(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        return models.Customer.objects.create(**input)

    permissions = [staffonly]
    input = {'card_id': int, 'first_name': str, 'last_name': str}
    result = g.NN(types.Cm2Customer)


@c.class_field
class cm2CloseOrder(helpers.BaseField):
    def resolve(self, _, info, id):
        models.Order.objects.get(pk=id).close()
        return True

    permissions = [staffonly]
    args = {'id': 'ID!'}
    result = bool


mutations = c.as_dict()
