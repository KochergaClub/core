from ariadne import QueryType

from kocherga.django.schema_utils import require_staff

from .. import models

Query = QueryType()


@require_staff
@Query.field('cm2Customers')
def resolve_cm2Customers(obj, info, search=None, **pager):
    qs = models.Customer.objects.all()
    if search:
        qs = qs.search(search)
    return qs.relay_page(**pager)


@require_staff
@Query.field('cm2Orders')
def resolve_cm2Orders(obj, info, status=None, **pager):
    qs = models.Order.objects.all()
    if status:
        qs = qs.filter_by_status(status)
    return qs.relay_page(**pager)


@require_staff
@Query.field('cm2Customer')
def resolve_cm2Customer(obj, info, id):
    return models.Customer.objects.get(pk=id)


@require_staff
@Query.field('cm2Order')
def resolve_cm2Order(obj, info, id):
    return models.Order.objects.get(pk=id)
