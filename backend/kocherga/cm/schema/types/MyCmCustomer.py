from kocherga.graphql.types import DjangoObjectType

from ... import models

MyCmCustomer = DjangoObjectType('MyCmCustomer', models.Customer)


@MyCmCustomer.field('orders_count')
def resolve_orders_count(obj, info):
    return obj.orders().count()


# TODO - pager
@MyCmCustomer.field('orders')
def resolve_orders(obj, info):
    return obj.orders().order_by('-order_id')[:10]
