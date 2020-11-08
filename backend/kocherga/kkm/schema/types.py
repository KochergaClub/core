from kocherga.graphql import django_utils
from .. import models

OfdFiscalDrive = django_utils.DjangoObjectType(
    'OfdFiscalDrive',
    model=models.OfdFiscalDrive,
    db_fields=[
        'id',
        'fiscal_drive_number',
    ],
)
