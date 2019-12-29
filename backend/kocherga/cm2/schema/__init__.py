import graphene
from graphene_django import DjangoConnectionField

from kocherga.django.schema_utils import require_staff

from .. import models
from . import objects, mutations


class Query:
    cm2Customers = DjangoConnectionField(
        objects.Cm2Customer,
        required=True,
        search=graphene.String()
    )

    @require_staff
    def resolve_cm2Customers(self, info, search=None, **kwargs):
        qs = models.Customer.objects.all()
        if search:
            qs = qs.search(search)
        return qs

    cm2Orders = DjangoConnectionField(
        objects.Cm2Order,
        required=True,
        status=graphene.String()
    )

    @require_staff
    def resolve_cm2Orders(self, info, status=None, **kwargs):
        qs = models.Order.objects.all()
        if status:
            qs = qs.filter_by_status(status)
        return qs

    cm2Customer = graphene.Field(graphene.NonNull(objects.Cm2Customer), id = graphene.ID(required=True))

    @require_staff
    def resolve_cm2Customer(self, info, id):
        return models.Customer.objects.get(pk=id)

    cm2Order = graphene.Field(graphene.NonNull(objects.Cm2Order), id = graphene.ID(required=True))

    @require_staff
    def resolve_cm2Order(self, info, id):
        return models.Order.objects.get(pk=id)


class Mutation:
    cm2CreateOrder = mutations.Cm2CreateOrder.Field(required=True)
    cm2CreateCustomer = mutations.Cm2CreateCustomer.Field(required=True)
    cm2CloseOrder = mutations.Cm2CloseOrder.Field(required=True)
