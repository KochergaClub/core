from kocherga.graphql.types import PrefixedQueryType

from .. import models

PREFIX = 'mastermindDating'

Query = PrefixedQueryType(prefix=PREFIX)


@Query.field('Cohorts')
def resolve_Cohorts(_, info):
    return models.Cohort.objects.all()


@Query.field('CohortById')
def resolve_CohortById(_, info, id):
    return models.Cohort.objects.get(pk=id)
