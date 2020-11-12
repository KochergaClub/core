from kocherga.graphql import g
from kocherga.graphql.helpers import field_with_permissions
from kocherga.wagtail.schema import types as wagtail_types


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


def settings_fields():
    # TODO - do we actually need such strict permissions? Maybe these settings should simply be public.
    from kocherga.events.permissions import manage_events

    return g.fields(
        {
            'default_events_images_collection': field_with_permissions(
                wagtail_types.WagtailCollection, permissions=[manage_events]
            ),
            'default_events_vk_images_collection': field_with_permissions(
                wagtail_types.WagtailCollection, permissions=[manage_events]
            ),
        }
    )


Settings = g.ObjectType('Settings', fields=settings_fields)
