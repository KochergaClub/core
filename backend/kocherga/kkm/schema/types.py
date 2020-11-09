import datetime

from kocherga.graphql import django_utils, g, helpers

from .. import models

OfdFiscalDrive = django_utils.DjangoObjectType(
    'OfdFiscalDrive',
    model=models.OfdFiscalDrive,
    db_fields=[
        'id',
        'fiscal_drive_number',
    ],
)

OfdDocument = django_utils.DjangoObjectType(
    'OfdDocument',
    model=models.OfdDocument,
    db_fields=[
        'id',
        'cash',
        'electronic',
        'check_type',
    ],
    extra_fields={
        'created': g.Field(
            g.NN(g.String),
            resolve=lambda obj, info: datetime.datetime.fromtimestamp(obj.timestamp),
        ),
    },
    related_fields=lambda: {
        'items': OfdDocumentItem,
    },
)

OfdDocumentConnection = helpers.ConnectionType(OfdDocument)

OfdDocumentItem = django_utils.DjangoObjectType(
    'OfdDocumentItem',
    model=models.OfdDocumentItem,
    db_fields=[
        'id',
        'name',
        'quantity',
        'price',
        'sum',
        'product_type',
        'payment_type',
    ],
)
