from kocherga.graphql.helpers import Collection
from . import emails, orders, payments, schedule, ticket_types, tickets, trainings

mutations = Collection.merge(
    emails.mutations,
    orders.mutations,
    payments.mutations,
    schedule.mutations,
    ticket_types.mutations,
    tickets.mutations,
    trainings.mutations,
)
