from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly

from .. import models

from .types import CashierPaymentConnection

c = helpers.Collection()


@c.class_field
class cashierPayments(helpers.BaseField):
    permissions = [staffonly]
    args = helpers.connection_args()
    result = g.NN(CashierPaymentConnection)

    def resolve(self, _, info, **pager):
        return models.Payment.objects.relay_page(**pager)  # FIXME - order


queries = c.as_dict()
