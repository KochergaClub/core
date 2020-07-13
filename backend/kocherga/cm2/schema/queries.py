from typing import Optional
from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly

from .. import models
from . import types


c = helpers.Collection()


@c.class_field
class cm2Customers(helpers.BaseField):
    permissions = [staffonly]
    args = {'search': Optional[str], **helpers.connection_args()}
    result = g.NN(types.Cm2CustomerConnection)

    def resolve(self, obj, info, search=None, **pager):
        qs = models.Customer.objects.all()
        if search:
            qs = qs.search(search)
        return qs.relay_page(**pager)


@c.class_field
class cm2Orders(helpers.BaseField):
    permissions = [staffonly]
    args = {'status': Optional[str], **helpers.connection_args()}
    result = g.NN(types.Cm2OrderConnection)

    def resolve(self, _, info, status=None, **pager):
        qs = models.Order.objects.all()
        if status:
            qs = qs.filter_by_status(status)
        return qs.relay_page(**pager)


@c.class_field
class cm2Customer(helpers.BaseField):
    args = {'id': 'ID!'}
    result = g.NN(types.Cm2Customer)
    permissions = [staffonly]

    def resolve(self, _, info, id):
        return models.Customer.objects.get(pk=id)


@c.class_field
class cm2Order(helpers.BaseField):
    def resolve(self, _, info, id):
        return models.Order.objects.get(pk=id)

    args = {'id': 'ID!'}
    result = g.NN(types.Cm2Order)
    permissions = [staffonly]


queries = c.as_dict()
