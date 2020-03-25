from ariadne import MutationType
from django.contrib.auth import get_user_model

from .. import models

Mutation = MutationType()


@Mutation.field('myEventsTicketUnregister')
def myEventsTicketUnregister(_, info, event_id):
    event = models.Event.objects.public_events().get(uuid=event_id)
    ticket = models.Ticket.objects.unregister(
        user=info.context.user,
        event=event,
    )
    return ticket


@Mutation.field('myEventsTicketRegister')
def myEventsTicketRegister(_, info, event_id):
    event = models.Event.objects.public_events().get(uuid=event_id)
    ticket = models.Ticket.objects.register(
        user=info.context.user,
        event=event,
    )
    return ticket


@Mutation.field('myEventsTicketRegisterAnon')
def myEventsTicketRegisterAnon(_, info, input):
    event_id = input['event_id']
    email = input['email']
    subscribed_to_newsletter = input.get('subscribed_to_newsletter', False)

    KchUser = get_user_model()
    try:
        user = KchUser.objects.get(email=email)
    except KchUser.DoesNotExist:
        user = KchUser.objects.create_user(email)

    event = models.Event.objects.public_events().get(uuid=event_id)
    ticket = models.Ticket.objects.register(
        user=user,
        event=event,
        subscribed_to_newsletter=subscribed_to_newsletter,
    )
    return ticket


@Mutation.field('eventSetRealm')
def myEventsTicketRegisterAnon(_, info, input):
    event_id = input['event_id']
    realm = input['realm']

    event = models.Event.objects.get(uuid=event_id)
    assert not event.deleted

    assert realm in ('offline', 'youtube_broadcast')
    event.realm = realm
    event.save()

    return {
        'ok': True
    }
