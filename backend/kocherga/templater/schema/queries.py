from kocherga.graphql import g, helpers
from kocherga.graphql.decorators import staffonly

from .. import models

from . import types

c = helpers.Collection()


# imageTemplatesAll: [ImageTemplate!]! @staffonly
@c.class_field
class imageTemplatesAll(helpers.BaseField):
    @staffonly
    def resolve(self, _, info):
        names = models.list_templates()
        return [models.Template.by_name(name) for name in names]

    result = g.NNList(types.ImageTemplate)


# imageTemplateBySlug(slug: String!): ImageTemplate! @staffonly
@c.class_field
class imageTemplateBySlug(helpers.BaseField):
    @staffonly
    def resolve(self, _, info, slug):
        return models.Template.by_name(slug)

    args = {'slug': str}
    result = g.NN(types.ImageTemplate)


queries = c.as_dict()
