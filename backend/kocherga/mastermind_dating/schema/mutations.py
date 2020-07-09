from django.contrib.auth import get_user_model

from kocherga.graphql import g
from kocherga.graphql.decorators import staffonly
from kocherga.graphql.helpers import Collection
from kocherga.graphql.basic_types import BasicResult

from kocherga.events.models import Event

from .. import models
from . import types

c = Collection()

CohortMutationResult = g.ObjectType(
    'MastermindDatingCohortMutationResult',
    g.fields({'cohort': g.NN(types.MastermindDatingCohort)}),
)

ParticipantMutationResult = g.ObjectType(
    'MastermindDatingParticipantMutationResult',
    g.fields({'participant': g.NN(types.MastermindDatingParticipant)}),
)


@c.field
def mastermindDatingCreateCohort(helper):
    @staffonly
    def resolve(_, info):
        cohort = models.Cohort.objects.create()
        return {'cohort': cohort}

    return g.Field(g.NN(CohortMutationResult), resolve=resolve)


for (field_name, method) in [
    ('PopulateCohortFromEvent', 'populate_from_event'),
    ('SendInviteEmails', 'send_invite_emails'),
    ('ClearAllGroups', 'clear_all_groups'),
    ('RunSolver', 'run_solver'),
    ('BroadcastSolution', 'broadcast_solution'),
]:

    @staffonly
    def resolve(_, info, cohort_id):
        obj = models.Cohort.objects.get(pk=cohort_id)
        getattr(obj, method)()
        return {'cohort': obj}

    field = g.Field(
        g.NN(CohortMutationResult),
        args=g.arguments({'cohort_id': 'ID!'}),
        resolve=resolve,
    )
    c.add_field('mastermindDating' + field_name, field)


@c.field
def mastermindDatingDeleteCohort(helper):
    @staffonly
    def resolve(_, info, cohort_id):
        obj = models.Cohort.objects.get(pk=cohort_id)
        obj.delete()
        return {'ok': True}

    return g.Field(
        g.NN(BasicResult), args=g.arguments({'cohort_id': 'ID!'}), resolve=resolve,
    )


@c.field
def mastermindDatingCreateGroup(helper):
    @staffonly
    def resolve(_, info, cohort_id):
        cohort = models.Cohort.objects.get(cohort_id)
        models.Group.objects.create_for_cohort(cohort)
        return {'cohort': cohort}

    return g.Field(
        g.NN(CohortMutationResult),
        args=g.arguments({'cohort_id': 'ID!'}),
        resolve=resolve,
    )


@c.field
def mastermindDatingSetEventForCohort(_):
    @staffonly
    def resolve(_, info, cohort_id, event_id):
        cohort = models.Cohort.objects.get(cohort_id)
        event = Event.objects.get(uuid=event_id)
        cohort.event = event
        cohort.save()
        return {'cohort': cohort}

    return g.Field(
        g.NN(CohortMutationResult),
        args=g.arguments({'cohort_id': 'ID!', 'event_id': 'ID!'}),
        resolve=resolve,
    )


@c.field
def mastermindDatingUnsetEventForCohort(_):
    @staffonly
    def resolve(_, info, cohort_id):
        cohort = models.Cohort.objects.get(cohort_id)
        cohort.event = None
        cohort.save()
        return {'cohort': cohort}

    return g.Field(
        g.NN(CohortMutationResult),
        args=g.arguments({'cohort_id': 'ID!'}),
        resolve=resolve,
    )


@c.field
def mastermindDatingCreateParticipant(_):
    @staffonly
    def resolve(_, info, cohort, email):
        KchUser = get_user_model()
        try:
            kocherga_user = KchUser.objects.get(email=email)
        except KchUser.DoesNotExist:
            kocherga_user = KchUser.objects.create_user(email)

        (participant, _) = models.Participant.objects.get_or_create(
            user=kocherga_user, cohort=cohort,
        )

        return {'participant': participant}

    return g.Field(
        g.NN(ParticipantMutationResult),
        args=g.arguments({'cohort_id': 'ID!', 'email': str}),
        resolve=resolve,
    )


@c.field
def mastermindDatingActivateVoting(_):
    @staffonly
    def resolve(_, info, participant_id):
        obj = models.Participant.objects.get(pk=participant_id)
        obj.tinder_activate()
        return {'participant': obj}

    return g.Field(
        g.NN(ParticipantMutationResult),
        args=g.arguments({'participant_id': 'ID!'}),
        resolve=resolve,
    )


@c.field
def mastermindDatingSetPresenceStatus(_):
    @staffonly
    def resolve(_, info, participant_id, present):
        obj = models.Participant.objects.get(pk=participant_id)
        obj.present = present
        obj.full_clean()
        obj.save()
        return {'participant': obj}

    return g.Field(
        g.NN(ParticipantMutationResult),
        args=g.arguments({'participant_id': 'ID!', 'present': bool}),
        resolve=resolve,
    )


mutations = c.as_dict()
