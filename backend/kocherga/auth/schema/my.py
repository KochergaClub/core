from kocherga.graphql import g, helpers
from . import types


c = helpers.Collection()


@c.class_field
class user(helpers.BaseField):
    permissions = []
    result = g.NN(types.AuthCurrentUser)

    def resolve(self, _, info):
        return info.context.user


my_queries = c.as_dict()
