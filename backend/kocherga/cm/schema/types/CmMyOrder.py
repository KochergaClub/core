from kocherga.graphql.types import DjangoObjectType

from ... import models

CmMyOrder = DjangoObjectType('CmMyOrder', models.Order)


CmMyOrder.simple_property_field('start_dt')
CmMyOrder.simple_property_field('end_dt')
