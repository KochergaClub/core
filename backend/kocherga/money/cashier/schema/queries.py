from kocherga.graphql import g, helpers
from kocherga.graphql.decorators import staffonly

from .. import models

from .types import CashierPaymentConnection

c = helpers.Collection()


@c.class_field
class cashierPayments(helpers.BaseField):
    @staffonly
    def resolve(self, _, info, **pager):
        return models.Payment.objects.relay_page(**pager)  # FIXME - order

    args = helpers.connection_args()
    result = g.NN(CashierPaymentConnection)


queries = c.as_dict()
