import logging
logger = logging.getLogger(__name__)

from datetime import datetime
from ariadne import MutationType
from django.contrib.auth import get_user_model

from kocherga.dateutils import TZ
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
    logger.debug(input)

    for field in (
            'title',
            'summary',
            'description',
            'location',
            'timing_description_override',
            'active',
            'weekday',
            'hour',
            'minute'
    ):
        if field in input:
            setattr(prototype, field, input[field])

    if 'project_slug' in input:
        if not input['project_slug']:
            prototype.project = None
        else:
            prototype.project = kocherga.projects.models.ProjectPage.objects.live().public().get(slug=input['project_slug'])

    prototype.full_clean()
    prototype.save()

    return {
        'ok': True,
        'prototype': prototype,
    }


@Mutation.field('eventPrototypeCancelDate')
def eventPrototypeCancelDate(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])
    date_str = input['date']
    prototype.cancel_date(datetime.strptime(date_str, '%Y-%m-%d').date())
    prototype.save()

    return {
        'ok': True
    }


@Mutation.field('eventPrototypeNewEvent')
def eventPrototypeNewEvent(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])

    ts = input['ts']

    dt = datetime.fromtimestamp(ts, TZ)
    event = prototype.new_event(dt)

    return {
        'ok': True
    }


@Mutation.field('eventGenerateZoomLink')
def eventGenerateZoomLink(_, info, input):
    event_id = input['event_id']

    event = models.Event.objects.get(uuid=event_id)
    event.generate_zoom_link()

    return {
        'ok': True
    }


@Mutation.field('eventPrototypeAddTag')
def eventPrototypeAddTag(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])

    prototype.add_tag(input['tag'])

    return {
        'ok': True,
        'prototype': prototype,
    }


@Mutation.field('eventPrototypeDeleteTag')
def eventPrototypeDeleteTag(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])

    prototype.delete_tag(input['tag'])

    return {
        'ok': True,
        'prototype': prototype,
    }


@Mutation.field('eventPrototypeUploadImage')
def eventPrototypeUploadImage(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])
    logger.info(input)

    return {
        'ok': True,
        'prototype': prototype,
    }
