import graphene
from graphene_django import DjangoObjectType, DjangoConnectionField

from kocherga.django.schema_utils import NonNullConnection

from .. import models


class Cm2Customer(DjangoObjectType):
    class Meta:
        model = models.Customer
        fields = ('id', 'card_id', 'first_name', 'last_name')
        interfaces = (graphene.relay.Node,)
        connection_class = NonNullConnection

    orders = DjangoConnectionField(lambda: Cm2Order, required=True)

    def resolve_orders(self, info):
        return self.orders.filter_by_customer_id(self.pk)


class Cm2Order(DjangoObjectType):
    class Meta:
        model = models.Order
        fields = ('id', 'start', 'end')
        interfaces = (graphene.relay.Node,)
        connection_class = NonNullConnection

    customer = graphene.Field(Cm2Customer)

    value = graphene.Int(required=True)
