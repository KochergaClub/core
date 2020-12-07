from kocherga.auth.schema import types as auth_types
from kocherga.graphql import django_utils

from .. import models

Comment = django_utils.DjangoObjectType(
    'Comment',
    model=models.Comment,
    db_fields=['id', 'created', 'text'],
    extra_fields={
        'author': auth_types.AuthUser,
    },
)
