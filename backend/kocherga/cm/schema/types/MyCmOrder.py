from kocherga.graphql.types import DjangoObjectType

from ... import models

MyCmOrder = DjangoObjectType('MyCmOrder', models.Order)


MyCmOrder.simple_property_field('start_dt')
MyCmOrder.simple_property_field('end_dt')
