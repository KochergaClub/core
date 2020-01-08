from django.contrib.auth import get_user_model

from kocherga.graphql.types import DjangoObjectMutationType, PrefixedMutationType

from .. import models
from kocherga.events.models import Event

PREFIX = 'mastermindDating'


def create_mutations():
    Mutation = PrefixedMutationType(prefix=PREFIX)

    @Mutation.field('CreateCohort')
    def resolve_CreateCohort(_, info):
        return models.Cohort.objects.create()

    return Mutation


def create_cohort_mutations():
    CohortMutation = DjangoObjectMutationType(
        id_argument='cohort_id',
        prefix=PREFIX,
        model=models.Cohort,
    )

    CohortMutation.create_simple_method_field_wtih_boolean_result('PopulateCohortFromEvent', 'populate_from_event')
    CohortMutation.create_simple_method_field_wtih_boolean_result('SendInviteEmails', 'send_invite_emails')
    CohortMutation.create_simple_method_field_wtih_boolean_result('ClearAllGroups', 'clear_all_groups')
    CohortMutation.create_simple_method_field_wtih_boolean_result('RunSolver', 'run_solver')
    CohortMutation.create_simple_method_field_wtih_boolean_result('BroadcastSolution', 'broadcast_solution')

    @CohortMutation.object_field('CreateGroup')
    def resolve_cohort_CreateGroup(_, info, cohort):
        models.Group.objects.create_for_cohort(cohort)
        return True

    @CohortMutation.object_field('SetEventForCohort')
    def resolve_cohort_SetEventForCohort(_, info, cohort, event_id):
        event = Event.objects.get(uuid=event_id)
        cohort.event = event
        cohort.save()
        return True

    @CohortMutation.object_field('UnsetEventForCohort')
    def resolve_cohort_UnsetEventForCohort(_, info, cohort):
        cohort.event = None
        cohort.save()
        return True

    @CohortMutation.object_field('CreateParticipant')
    def resolve_CreateParticipant(_, info, cohort, email):
        KchUser = get_user_model()
        try:
            kocherga_user = KchUser.objects.get(email=email)
        except KchUser.DoesNotExist:
            kocherga_user = KchUser.objects.create_user(email)

        (participant, _) = models.Participant.objects.get_or_create(
            user=kocherga_user,
            cohort=cohort,
        )

        return participant

    return CohortMutation


def create_participant_mutations():
    ParticipantMutation = DjangoObjectMutationType(
        id_argument='participant_id',
        prefix=PREFIX,
        model=models.Participant,
    )

    ParticipantMutation.create_simple_method_field_wtih_boolean_result('ActivateVoting', 'tinder_activate')

    return ParticipantMutation


types = [create_mutations(), create_cohort_mutations(), create_participant_mutations()]
