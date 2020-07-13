from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly

from .. import models

from . import types

c = helpers.Collection()


# imageTemplatesAll: [ImageTemplate!]! @staffonly
@c.class_field
class imageTemplatesAll(helpers.BaseField):
    def resolve(self, _, info):
        names = models.list_templates()
        return [models.Template.by_name(name) for name in names]

    permissions = [staffonly]
    result = g.NNList(types.ImageTemplate)


# imageTemplateBySlug(slug: String!): ImageTemplate! @staffonly
@c.class_field
class imageTemplateBySlug(helpers.BaseField):
    def resolve(self, _, info, slug):
        return models.Template.by_name(slug)

    permissions = [staffonly]
    args = {'slug': str}
    result = g.NN(types.ImageTemplate)


queries = c.as_dict()
