from ariadne import MutationType

from kocherga.django.schema_utils import require_staff

from .. import models

Mutation = MutationType()


@require_staff
@Mutation.field('cm2CreateOrder')
def resolve_cm2CreateOrder(_, info, input):
    customer = None
    if 'customer' in input:
        customer = models.Cm2Customer.objects.get(pk=input['customer'])

    return models.Cm2Order.create(customer=customer)


@require_staff
@Mutation.field('cm2CreateCustomer')
def resolve_cm2CreateCustomer(_, info, input):
    return models.Cm2Customer.create(
        **input
    )


@require_staff
@Mutation.field('cm2CloseOrder')
def resolve_cm2CloseOrder(self, info, id):
    models.Cm2Order.get(pk=id).close()
    return True
