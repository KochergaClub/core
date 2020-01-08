from kocherga.graphql.types import DjangoObjectType

from ... import models

MastermindDatingCohort = DjangoObjectType('MastermindDatingCohort', models.Cohort)
MastermindDatingCohort.related_field('participants')
MastermindDatingCohort.related_field('groups')

MastermindDatingParticipant = DjangoObjectType('MastermindDatingParticipant', models.Participant)

MastermindDatingGroup = DjangoObjectType('MastermindDatingGroup', models.Group)
MastermindDatingGroup.related_field('participants')

types = [MastermindDatingCohort, MastermindDatingParticipant, MastermindDatingGroup]
