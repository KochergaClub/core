from ariadne import ObjectType

Cm2Customer = ObjectType('Cm2Customer')


@Cm2Customer.field('orders')
def resolve_orders(obj, info, **pager):
    obj.orders.filter_by_customer_id(obj.pk).relay_page(**pager)
