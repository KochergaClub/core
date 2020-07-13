from kocherga.graphql import g, helpers, permissions

from ..daemon import all_importers

c = helpers.Collection()

Importer = g.ObjectType('Importer', g.fields({'name': 'ID!'}))


@c.class_field
class importers(helpers.BaseField):
    permissions = [permissions.staffonly]
    result = g.NNList(Importer)

    def resolve(self, _, info):
        return all_importers()


queries = c.as_dict()
