from kocherga.graphql.types import DjangoObjectType

from ... import models

MastermindDatingCohort = DjangoObjectType('MastermindDatingCohort', models.Cohort)
MastermindDatingCohort.related_field('participants')
MastermindDatingCohort.related_field('groups')


MastermindDatingParticipant = DjangoObjectType(
    'MastermindDatingParticipant', models.Participant
)


@MastermindDatingParticipant.field('photo')
def resolve_MastermindDatingParticipant_photo(obj, info):
    return obj.photo.url if obj.photo else None


MastermindDatingGroup = DjangoObjectType('MastermindDatingGroup', models.Group)
MastermindDatingGroup.related_field('participants')

types = [MastermindDatingCohort, MastermindDatingParticipant, MastermindDatingGroup]
