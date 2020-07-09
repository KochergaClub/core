from kocherga.graphql import g, helpers

from . import types

from .. import models

c = helpers.Collection()


# tildaPage(path: String!): TildaPage
@c.class_field
class tildaPage(helpers.BaseField):
    def resolve(self, _, info, path):
        try:
            return models.TildaPage.objects.get(path=path)
        except models.TildaPage.DoesNotExist:
            return None

    args = {'path': str}
    result = types.TildaPage


# tildaPages: [TildaPage!]!
@c.class_field
class tildaPages(helpers.BaseField):
    # TODO - staffonly? it's incompatible with getStaticPaths, though...
    def resolve(self, _, info):
        return list(models.TildaPage.objects.all())

    result = g.NNList(types.TildaPage)


queries = c.as_dict()
