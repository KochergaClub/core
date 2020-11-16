from typing import Optional

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm

from .. import models
from . import types

c = helpers.Collection()


@c.class_field
class kkmStatus(helpers.BaseField):
    def resolve(self, _, info):
        return {
            'last_shift_closed': models.Controller.load().last_shift_closed,
        }

    permissions = [user_perm('kkm.kkmserver')]

    result = {
        'last_shift_closed': Optional[str],
    }


@c.class_field
class ofdFiscalDrives(helpers.BaseField):
    def resolve(self, _, info):
        return models.OfdFiscalDrive.objects.all()

    permissions = [user_perm('kkm.ofd')]

    result = g.NNList(types.OfdFiscalDrive)


@c.class_field
class ofdDocuments(helpers.BaseField):
    def resolve(self, _, info, **pager):
        return models.OfdDocument.objects.relay_page(**pager)

    permissions = [user_perm('kkm.ofd')]

    args = helpers.connection_args()
    result = g.NN(types.OfdDocumentConnection)


@c.class_field
class ofdShifts(helpers.BaseField):
    def resolve(self, _, info, filter=None, **pager):
        qs = models.OfdShift.objects.all()
        if filter:
            if filter.get('open_only'):
                qs = qs.filter(close_dt__isnull=True)
        return qs.relay_page(**pager)

    permissions = [user_perm('kkm.ofd')]

    FilterInput = g.InputObjectType(
        'OfdShiftsFilterInput', g.input_fields({'open_only': Optional[bool]})
    )
    args = {**helpers.connection_args(), 'filter': FilterInput}
    result = g.NN(types.OfdShiftConnection)


queries = c.as_dict()
