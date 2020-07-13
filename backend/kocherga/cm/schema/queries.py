from kocherga.graphql.helpers import Collection
from kocherga.graphql import g

from ..tools import now_stats_cached

c = Collection()

NowCustomer = g.ObjectType(
    'NowCustomer', g.fields({'card_id': int, 'first_name': str, 'last_name': str})
)

NowInfo = g.ObjectType(
    'NowInfo', g.fields({'total': int, 'customers': g.NNList(NowCustomer)})
)


@c.field
def now(helper):
    def resolve(_, info):
        return now_stats_cached()

    return g.Field(g.NN(NowInfo), resolve=resolve)


queries = c.as_dict()
