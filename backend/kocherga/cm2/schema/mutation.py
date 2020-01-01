from ariadne import MutationType

from .. import models

Mutation = MutationType()


@Mutation.field('cm2CreateOrder')
def resolve_cm2CreateOrder(_, info, input):
    customer = None
    if 'customer' in input:
        customer = models.Customer.objects.get(pk=input['customer'])

    return models.Order.objects.create(customer=customer)


@Mutation.field('cm2CreateCustomer')
def resolve_cm2CreateCustomer(_, info, input):
    return models.Customer.objects.create(
        **input
    )


@Mutation.field('cm2CloseOrder')
def resolve_cm2CloseOrder(self, info, id):
    models.Order.objects.get(pk=id).close()
    return True
