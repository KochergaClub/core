from kocherga.graphql import g, helpers
from kocherga.graphql.decorators import staffonly

from ..daemon import all_importers

c = helpers.Collection()

Importer = g.ObjectType('Importer', g.fields({'name': 'ID!'}))


# importers: [Importer!]! @staffonly
@c.class_field
class importers(helpers.BaseField):
    @staffonly
    def resolve(self, _, info):
        return all_importers()

    result = g.NNList(Importer)


queries = c.as_dict()
