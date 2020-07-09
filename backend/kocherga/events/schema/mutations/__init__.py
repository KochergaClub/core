from kocherga.graphql.helpers import merge_field_dicts
from . import my, events, prototypes, weekly_digests, announcements, feedbacks

mutations = merge_field_dicts(
    [
        my.mutations,
        events.mutations,
        prototypes.mutations,
        weekly_digests.mutations,
        announcements.mutations,
        feedbacks.mutations,
    ]
)
