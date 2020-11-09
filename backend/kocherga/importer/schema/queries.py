from typing import Optional

from kocherga.graphql import g, helpers, permissions

from ..daemon import all_importers, get_importer

c = helpers.Collection()

Importer = g.ObjectType(
    'Importer',
    g.fields(
        {
            'name': 'ID!',
            'last_dt': Optional[str],
        }
    ),
)


@c.class_field
class importers(helpers.BaseField):
    permissions = [permissions.staffonly]
    result = g.NNList(Importer)

    def resolve(self, _, info):
        return all_importers()


@c.class_field
class importer(helpers.BaseField):
    permissions = [permissions.staffonly]
    result = g.NN(Importer)
    args = g.arguments({
        'module_name': str,
    })

    def resolve(self, _, info, module_name):
        return get_importer(module_name)


queries = c.as_dict()
