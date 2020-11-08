from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm

from .. import models

from . import types

c = helpers.Collection()


@c.class_field
class ofdFiscalDrives(helpers.BaseField):
    def resolve(self, _, info):
        return models.OfdFiscalDrive.objects.all()

    permissions = [user_perm('kkm.ofd')]

    result = g.NNList(types.OfdFiscalDrive)


queries = c.as_dict()
