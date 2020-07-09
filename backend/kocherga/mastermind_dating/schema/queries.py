from kocherga.graphql.helpers import Collection
from kocherga.graphql import g
from kocherga.graphql.decorators import staffonly

from .. import models
from . import types

c = Collection()


@c.field
def mastermindDatingCohorts(helper):
    @staffonly
    def resolve(_, info):
        return models.Cohort.objects.all()

    # mastermindDatingCohorts: [MastermindDatingCohort!]! @staffonly
    return g.Field(g.NNList(types.MastermindDatingCohort), resolve=resolve)


@c.field
def mastermindDatingCohortById(helper):
    def resolve(_, info, id):
        return models.Cohort.objects.get(pk=id)

    # mastermindDatingCohortById(id: ID!): MastermindDatingCohort! @staffonly
    return g.Field(
        g.NN(types.MastermindDatingCohort),
        args=g.arguments({'id': 'ID!'}),
        resolve=resolve,
    )


queries = c.as_dict()
