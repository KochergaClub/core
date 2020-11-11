from kocherga.graphql.helpers import merge_field_dicts

from . import audit, login

mutations = merge_field_dicts(
    [
        audit.mutations,
        login.mutations,
    ]
)
