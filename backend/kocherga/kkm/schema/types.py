import datetime
from kocherga.graphql import g, helpers, django_utils
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
)

OfdDocumentConnection = helpers.ConnectionType(OfdDocument)
