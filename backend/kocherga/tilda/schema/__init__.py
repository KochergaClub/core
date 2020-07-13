from kocherga.graphql import g, helpers

from . import types

from .. import models

c = helpers.Collection()


@c.class_field
class tildaPage(helpers.BaseField):
    def resolve(self, _, info, path):
        try:
            return models.TildaPage.objects.get(path=path)
        except models.TildaPage.DoesNotExist:
            return None

    permissions = []
    args = {'path': str}
    result = types.TildaPage


@c.class_field
class tildaPages(helpers.BaseField):
    def resolve(self, _, info):
        return list(models.TildaPage.objects.all())

    # TODO - staffonly? it's incompatible with getStaticPaths, though...
    permissions = []

    result = g.NNList(types.TildaPage)


queries = c.as_dict()
