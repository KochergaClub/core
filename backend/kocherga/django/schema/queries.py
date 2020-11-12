from kocherga.graphql import g, helpers

from .. import models
from . import types

c = helpers.Collection()


@c.class_field
class settings(helpers.BaseField):
    def resolve(self, _, info):
        return models.Settings.load()

    permissions = []  # permissions are checked on specific fields
    result = g.NN(types.Settings)


queries = c.as_dict()
