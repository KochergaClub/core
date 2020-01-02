from ariadne import MutationType

Mutation = MutationType()


@Mutation.field('myTicketDelete')
def myTicketDelete(_, info, event_id):
    models.Ticket.objects.filter(
        user=info.context.user,
        event__uuid=event_id,
    ).delete()
    return True
