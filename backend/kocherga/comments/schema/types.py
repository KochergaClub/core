from kocherga.auth.schema import types as auth_types
from kocherga.graphql import django_utils, g

from .. import models

Comment = django_utils.DjangoObjectType(
    'Comment',
    model=models.Comment,
    db_fields=['id', 'created', 'text'],
    extra_fields={
        'author': g.NN(auth_types.AuthUser),
    },
)

Commentable = g.InterfaceType(
    'Commentable',
    fields={
        'comments_count': g.NN(g.Int),
        'comments': g.NNList(Comment),
    },
)
