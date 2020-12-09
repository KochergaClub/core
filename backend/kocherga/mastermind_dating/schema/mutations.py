from django.contrib.auth import get_user_model
from kocherga.events.models import Event
from kocherga.graphql import g, helpers
from kocherga.graphql.basic_types import BasicResult
from kocherga.graphql.permissions import check_permissions, staffonly

from .. import models
from . import types

c = helpers.Collection()

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
    @check_permissions([staffonly])
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

    @check_permissions([staffonly])
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
    @check_permissions([staffonly])
    def resolve(_, info, cohort_id):
        obj = models.Cohort.objects.get(pk=cohort_id)
        obj.delete()
        return {'ok': True}

    return g.Field(
        g.NN(BasicResult),
        args=g.arguments({'cohort_id': 'ID!'}),
        resolve=resolve,
    )


@c.field
def mastermindDatingCreateGroup(helper):
    @check_permissions([staffonly])
    def resolve(_, info, cohort_id):
        cohort = models.Cohort.objects.get(pk=cohort_id)
        models.Group.objects.create_for_cohort(cohort)
        return {'cohort': cohort}

    return g.Field(
        g.NN(CohortMutationResult),
        args=g.arguments({'cohort_id': 'ID!'}),
        resolve=resolve,
    )


@c.field
def mastermindDatingSetEventForCohort(_):
    @check_permissions([staffonly])
    def resolve(_, info, cohort_id, event_id):
        cohort = models.Cohort.objects.get(pk=cohort_id)
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
    @check_permissions([staffonly])
    def resolve(_, info, cohort_id):
        cohort = models.Cohort.objects.get(pk=cohort_id)
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
    @check_permissions([staffonly])
    def resolve(_, info, cohort_id, email):
        KchUser = get_user_model()
        try:
            kocherga_user = KchUser.objects.get(email=email)
        except KchUser.DoesNotExist:
            kocherga_user = KchUser.objects.create_user(email)

        cohort = models.Cohort.objects.get(pk=cohort_id)

        (participant, _) = models.Participant.objects.get_or_create(
            user=kocherga_user,
            cohort=cohort,
        )

        return {'participant': participant}

    return g.Field(
        g.NN(ParticipantMutationResult),
        args=g.arguments({'cohort_id': 'ID!', 'email': str}),
        resolve=resolve,
    )


@c.field
def mastermindDatingActivateVoting(_):
    @check_permissions([staffonly])
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
    @check_permissions([staffonly])
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
