from kocherga.graphql import g, helpers
from kocherga.graphql.decorators import staffonly

from .. import models
from . import types

c = helpers.Collection()


# cm2CreateOrder(input: Cm2CreateOrderInput!): Cm2Order! @staffonly
@c.field
def cm2CreateOrder(helper):
    @staffonly
    def resolve(_, info, input):
        customer = None
        if 'customer' in input:
            customer = models.Customer.objects.get(pk=input['customer'])

        return models.Order.objects.create(customer=customer)

    # input Cm2CreateOrderInput {
    #   customer: ID
    # }
    Input = g.InputObjectType(
        'Cm2CreateOrderInput', g.input_fields({'customer': 'ID'}),
    )

    return g.Field(
        g.NN(types.Cm2Order), args=g.arguments({'input': g.NN(Input)}), resolve=resolve
    )


# cm2CreateCustomer(input: Cm2CreateCustomerInput!): Cm2Customer! @staffonly
@c.field
def cm2CreateCustomer(helper):
    @staffonly
    def resolve(_, info, input):
        return models.Customer.objects.create(**input)

    # input Cm2CreateCustomerInput {
    #   card_id: Int!
    #   first_name: String!
    #   last_name: String!
    # }
    Input = g.InputObjectType(
        'Cm2CreateCustomerInput',
        g.input_fields({'card_id': int, 'first_name': str, 'last_name': str}),
    )

    return g.Field(
        g.NN(types.Cm2Customer),
        args=g.arguments({'input': g.NN(Input)}),
        resolve=resolve,
    )


# cm2CloseOrder(id: ID!): Boolean @staffonly
@c.field
def cm2CloseOrder(helper):
    @staffonly
    def resolve(obj, info, id):
        models.Order.objects.get(pk=id).close()
        return True

    return g.Field(g.Boolean, args=g.arguments({'id': 'ID!'}), resolve=resolve)


mutations = c.as_dict()
