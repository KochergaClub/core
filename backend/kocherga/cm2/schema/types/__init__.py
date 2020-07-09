from typing import Optional

from kocherga.graphql import g, helpers

Cm2Order = g.ObjectType(
    'Cm2Order',
    fields=lambda: g.fields(
        {
            'id': 'ID!',
            'start': str,
            'end': Optional[str],
            'customer': Cm2Customer,
            'value': int,
        }
    ),
)

Cm2OrderConnection = helpers.ConnectionType(Cm2Order)


def resolve_Cm2Customer_orders(obj, info, **pager):
    return obj.orders.filter_by_customer_id(obj.pk).relay_page(**pager)


Cm2Customer = g.ObjectType(
    'Cm2Customer',
    g.fields(
        {
            'id': 'ID!',
            'card_id': int,
            'first_name': str,
            'last_name': str,
            'orders': helpers.ConnectionField(
                Cm2OrderConnection, resolve=resolve_Cm2Customer_orders
            ),
        }
    ),
)

Cm2CustomerConnection = helpers.ConnectionType(Cm2Customer)
