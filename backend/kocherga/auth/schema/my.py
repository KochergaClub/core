from kocherga.graphql import g
from kocherga.graphql.helpers import Collection
from . import types


c = Collection()


# user: AuthCurrentUser!
@c.field
def user(helper):
    def resolve(_, info):
        return info.context.user

    return g.Field(g.NN(types.AuthCurrentUser), resolve=resolve)


my_queries = c.as_dict()
