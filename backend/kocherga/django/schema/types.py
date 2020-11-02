from kocherga.graphql import g


def build_ValidationError():
    ValidationErrorItem = g.ObjectType(
        'ValidationErrorItem',
        fields=g.fields(
            {
                'name': str,
                'messages': g.NNList(g.String),
            }
        ),
    )

    def resolve_errors(obj, info):
        # note .error, obj is boxed with kocherga.django.errors.BoxedError
        return [
            {'name': k, 'messages': [str(e) for e in v]}
            for k, v in obj.error.message_dict.items()
        ]

    return g.ObjectType(
        'ValidationError',
        fields={
            'errors': g.Field(
                g.NNList(ValidationErrorItem),
                resolve=resolve_errors,
            ),
        },
    )


ValidationError = build_ValidationError()


GenericError = g.ObjectType(
    'GenericError',
    fields=g.fields(
        {
            'message': str,
        }
    ),
)
