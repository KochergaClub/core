from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly, check_permissions

from .. import models
from . import types

c = helpers.Collection()


@c.field
def mastermindDatingCohorts(helper):
    @check_permissions([staffonly])
    def resolve(_, info):
        return models.Cohort.objects.all()

    return g.Field(g.NNList(types.MastermindDatingCohort), resolve=resolve)


@c.field
def mastermindDatingCohortById(helper):
    @check_permissions([staffonly])
    def resolve(_, info, id):
        return models.Cohort.objects.get(pk=id)

    return g.Field(
        g.NN(types.MastermindDatingCohort),
        args=g.arguments({'id': 'ID!'}),
        resolve=resolve,
    )


queries = c.as_dict()
