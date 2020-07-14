from kocherga.graphql import g, helpers
from . import types


c = helpers.Collection()


# user: AuthCurrentUser!
@c.field
def user(helper):
    def resolve(_, info):
        return info.context.user

    return g.Field(g.NN(types.AuthCurrentUser), resolve=resolve)


my_queries = c.as_dict()
