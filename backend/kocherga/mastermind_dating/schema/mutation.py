from django.contrib.auth import get_user_model

from kocherga.graphql.types import DjangoObjectMutationType, PrefixedMutationType

from .. import models
from kocherga.events.models import Event

PREFIX = 'mastermindDating'


def create_mutations():
    Mutation = PrefixedMutationType(prefix=PREFIX)

    @Mutation.field('CreateCohort')
    def resolve_CreateCohort(_, info):
        cohort = models.Cohort.objects.create()
        return {'cohort': cohort}

    return Mutation


def create_cohort_mutations():
    CohortMutation = DjangoObjectMutationType(
        id_argument='cohort_id', prefix=PREFIX, model=models.Cohort,
    )

    for (field, method) in [
        ('PopulateCohortFromEvent', 'populate_from_event'),
        ('SendInviteEmails', 'send_invite_emails'),
        ('ClearAllGroups', 'clear_all_groups'),
        ('RunSolver', 'run_solver'),
        ('BroadcastSolution', 'broadcast_solution'),
    ]:
        CohortMutation.create_simple_method_field(
            field_name=field,
            method_name=method,
            result_format='wrapped_obj',
            result_key='cohort',
        )

    CohortMutation.create_simple_method_field(
        'DeleteCohort', 'delete', result_format='ok'
    )

    @CohortMutation.object_field('CreateGroup')
    def resolve_cohort_CreateGroup(_, info, cohort):
        models.Group.objects.create_for_cohort(cohort)
        return {'cohort': cohort}

    @CohortMutation.object_field('SetEventForCohort')
    def resolve_cohort_SetEventForCohort(_, info, cohort, event_id):
        event = Event.objects.get(uuid=event_id)
        cohort.event = event
        cohort.save()
        return {'cohort': cohort}

    @CohortMutation.object_field('UnsetEventForCohort')
    def resolve_cohort_UnsetEventForCohort(_, info, cohort):
        cohort.event = None
        cohort.save()
        return {'cohort': cohort}

    @CohortMutation.object_field('CreateParticipant')
    def resolve_CreateParticipant(_, info, cohort, email):
        KchUser = get_user_model()
        try:
            kocherga_user = KchUser.objects.get(email=email)
        except KchUser.DoesNotExist:
            kocherga_user = KchUser.objects.create_user(email)

        (participant, _) = models.Participant.objects.get_or_create(
            user=kocherga_user, cohort=cohort,
        )

        return {'participant': participant}

    return CohortMutation


def create_participant_mutations():
    ParticipantMutation = DjangoObjectMutationType(
        id_argument='participant_id', prefix=PREFIX, model=models.Participant,
    )

    ParticipantMutation.create_simple_method_field(
        'ActivateVoting',
        'tinder_activate',
        result_format='wrapped_obj',
        result_key='participant',
    )

    @ParticipantMutation.object_field('SetPresenceStatus')
    def resolve_SetPresenseStatus(_, info, participant, present):
        participant.present = present
        participant.save()
        return {'participant': participant}

    return ParticipantMutation


types = [create_mutations(), create_cohort_mutations(), create_participant_mutations()]
