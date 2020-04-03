from ariadne import MutationType
from django.contrib.auth import get_user_model

import kocherga.projects.models
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
def eventSetRealm(_, info, input):
    event_id = input['event_id']
    realm = input['realm']

    event = models.Event.objects.get(uuid=event_id)
    assert not event.deleted

    assert realm in ('offline', 'online')
    event.realm = realm
    event.save()

    return {
        'ok': True
    }


@Mutation.field('eventSetPricingType')
def eventSetPricingType(_, info, input):
    event_id = input['event_id']
    pricing_type = input['pricing_type']

    event = models.Event.objects.get(uuid=event_id)
    assert not event.deleted

    event.pricing_type = pricing_type
    event.full_clean()
    event.save()

    return {
        'ok': True
    }


@Mutation.field('eventSetZoomLink')
def eventSetZoomLink(_, info, input):
    event_id = input['event_id']
    zoom_link = input['zoom_link']

    event = models.Event.objects.get(uuid=event_id)
    event.set_zoom_link(zoom_link)

    return {
        'ok': True
    }


@Mutation.field('eventPrototypeUpdate')
def eventPrototypeUpdate(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])

    for field in ('title', 'location', 'active', 'weekday', 'hour', 'minute'):
        if field in input:
            setattr(prototype, field, input[field])

    if 'project_slug' in input:
        prototype.project = kocherga.projects.models.ProjectPage.objects.live().public().get(slug=input['project_slug'])

    prototype.full_clean()
    prototype.save()

    return {
        'ok': True
    }
