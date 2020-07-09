from typing import Optional
from kocherga.graphql.helpers import Collection
from kocherga.graphql import g, django_utils
from kocherga.graphql.decorators import auth

from .. import models

c = Collection()

MyCmOrder = g.ObjectType(
    'MyCmOrder', g.fields({'order_id': 'ID!', 'start_dt': str, 'end_dt': Optional[str]})
)


def resolve_orders_count(obj, info):
    return obj.orders().count()


# TODO - pager
def resolve_MyCmCustomer_orders(obj, info):
    return obj.orders().order_by('-order_id')[:10]


MyCmCustomer = g.ObjectType(
    'MyCmCustomer',
    g.fields(
        {
            **django_utils.model_fields(
                models.Customer,
                [
                    'card_id',
                    'subscription_until',
                    'last_visit',
                    'total_spent',
                    'privacy_mode',
                ],
            ),
            'orders_count': g.Field(
                g.NN(g.Int), resolve=lambda obj, info: obj.orders().count()
            ),
            'orders': g.Field(g.NNList(MyCmOrder), resolve=resolve_MyCmCustomer_orders),
        }
    ),
)


@c.field
def membership(helper):
    @auth(authenticated=True)
    def resolve(_, info):
        user = info.context.user
        if not hasattr(user, 'customer'):
            return None  # not all users have CM customer, that's fine

        return user.customer

    return g.Field(MyCmCustomer, resolve=resolve)


my_queries = c.as_dict()
