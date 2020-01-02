from kocherga.graphql.types import DjangoObjectType

from ... import models

CmMyCustomer = DjangoObjectType('CmMyCustomer', models.Customer)


@CmMyCustomer.field('orders_count')
def resolve_orders_count(obj, info):
    return obj.orders().count()


# TODO - pager
@CmMyCustomer.field('orders')
def resolve_orders(obj, info):
    return obj.orders().order_by('-order_id')[:10]
