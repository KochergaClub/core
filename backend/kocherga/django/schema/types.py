from kocherga.graphql import g
from kocherga.graphql.helpers import field_with_permissions


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
    # TODO - manage_events permission for telegram_images & other fields seems wrong and arbitrary.
    from kocherga.events.permissions import manage_events
    from kocherga.telegram.permissions import view_all_telegram_chats
    from kocherga.telegram.schema import types as telegram_types
    from kocherga.wagtail.schema import types as wagtail_types

    return g.fields(
        {
            **{
                f: field_with_permissions(
                    g.NN(wagtail_types.WagtailCollection), permissions=[manage_events]
                )
                for f in [
                    'default_events_images_collection',
                    'default_events_vk_images_collection',
                    'weekly_digest_images_collection',
                    'telegram_images_collection',
                ]
            },
            'community_org_team_telegram_chat': field_with_permissions(
                telegram_types.TelegramChat, permissions=[view_all_telegram_chats]
            ),
        }
    )


Settings = g.ObjectType('Settings', fields=settings_fields)
