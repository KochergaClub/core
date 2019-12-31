from ariadne import QueryType

from kocherga.django.schema_utils import require_staff

from .. import models

Query = QueryType()


@require_staff
@Query.field('cashierPayments')
def resolve_cashierPayments(_, info, **pager):
    return models.Payment.objects.relay_page(**pager)  # FIXME - order
