from ariadne import QueryType

from .. import models

Query = QueryType()


@Query.field('cashierPayments')
def resolve_cashierPayments(_, info, **pager):
    return models.Payment.objects.relay_page(**pager)  # FIXME - order
