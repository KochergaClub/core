from typing import Optional
from kocherga.graphql import g, helpers
from kocherga.graphql.decorators import staffonly

from .. import models
from . import types


c = helpers.Collection()


# cm2Customers(
#   search: String
#   before: String
#   after: String
#   first: Int
#   last: Int
# ): Cm2CustomerConnection! @staffonly
@c.field
def cm2Customers(helper):
    @staffonly
    def resolve(obj, info, search=None, **pager):
        qs = models.Customer.objects.all()
        if search:
            qs = qs.search(search)
        return qs.relay_page(**pager)

    return helpers.ConnectionField(
        g.NN(types.Cm2CustomerConnection),
        args=g.arguments({'search': Optional[str]}),
        resolve=resolve,
    )


# cm2Orders(
#   status: String
#   before: String
#   after: String
#   first: Int
#   last: Int
# ): Cm2OrderConnection! @staffonly
@c.field
def cm2Orders(helper):
    @staffonly
    def resolve(obj, info, status=None, **pager):
        qs = models.Order.objects.all()
        if status:
            qs = qs.filter_by_status(status)
        return qs.relay_page(**pager)

    return helpers.ConnectionField(
        g.NN(types.Cm2OrderConnection),
        args=g.arguments({'status': Optional[str]}),
        resolve=resolve,
    )


# cm2Customer(id: ID!): Cm2Customer! @staffonly
@c.field
def cm2Customer(helper):
    @staffonly
    def resolve(obj, info, id):
        return models.Customer.objects.get(pk=id)

    return g.Field(
        g.NN(types.Cm2Customer), args=g.arguments({'id': 'ID!'}), resolve=resolve
    )


# cm2Order(id: ID!): Cm2Order! @staffonly
@c.field
def cm2Order(helper):
    @staffonly
    def resolve(obj, info, id):
        return models.Order.objects.get(pk=id)

    return g.Field(
        g.NN(types.Cm2Order), args=g.arguments({'id': 'ID!'}), resolve=resolve
    )


queries = c.as_dict()
