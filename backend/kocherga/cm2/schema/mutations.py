import graphene

from kocherga.django.schema_utils import require_staff, Ok

from .. import models
from . import objects


class Cm2CreateOrderInput(graphene.InputObjectType):
    customer = graphene.ID()


class Cm2CreateOrder(graphene.Mutation):
    class Arguments:
        input = Cm2CreateOrderInput(required=True)

    Output = objects.Cm2Order

    @require_staff
    def mutate(self, info, input):
        customer = None
        if input.customer:
            customer = models.Cm2Customer.objects.get(pk=input.customer)

        return models.Cm2Order.create(customer=customer)


class Cm2CreateCustomerInput(graphene.InputObjectType):
    card_id = graphene.Int(required=True)
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)


class Cm2CreateCustomer(graphene.Mutation):
    class Arguments:
        input = Cm2CreateCustomerInput(required=True)

    Output = objects.Cm2Customer

    @require_staff
    def mutate(self, info, input):
        return models.Cm2Customer.create(
            **input
        )


class Cm2CloseOrder(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    Output = Ok

    @require_staff
    def mutate(self, info, id):
        models.Cm2Order.get(pk=id).close()
        return Ok(ok=True)
