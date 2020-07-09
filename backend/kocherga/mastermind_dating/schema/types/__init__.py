from kocherga.graphql import g, django_utils
import kocherga.auth.schema.types as auth_types

from ... import models

from kocherga.events.schema import types as event_types


# type MastermindDatingCohort


MastermindDatingCohort = g.ObjectType(
    'MastermindDatingCohort',
    fields=lambda: {
        **django_utils.model_fields(models.Cohort, ['id', 'leader_telegram_uid']),
        'event': g.Field(event_types.EventsEvent),
        'participants': django_utils.related_field(
            models.Cohort, 'participants', item_type=MastermindDatingParticipant
        ),
        'groups': django_utils.related_field(
            models.Cohort, 'groups', item_type=MastermindDatingGroup,
        ),
    },
)


# type MastermindDatingParticipant


def resolve_MastermindDatingParticipant_photo(obj, info):
    return obj.photo.url if obj.photo else None


MastermindDatingParticipant = g.ObjectType(
    'MastermindDatingParticipant',
    {
        **django_utils.model_fields(
            models.Participant,
            ['id', 'name', 'desc', 'voted_for', 'present', 'invite_email_sent'],
        ),
        'photo': g.Field(g.String, resolve=resolve_MastermindDatingParticipant_photo),
        'user': g.Field(g.NN(auth_types.AuthUser)),
        'cohort': g.Field(g.NN(MastermindDatingCohort)),
    },
)


# type MastermindDatingGroup


MastermindDatingGroup = g.ObjectType(
    'MastermindDatingGroup',
    {
        **django_utils.model_fields(models.Group, ['id', 'telegram_invite_link']),
        'participants': django_utils.related_field(
            models.Group, 'participants', item_type=MastermindDatingParticipant
        ),
    },
)
