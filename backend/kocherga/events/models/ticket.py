import logging
logger = logging.getLogger(__name__)

import markdown

from datetime import datetime

from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.mail import send_mail
from django.template.loader import render_to_string

import channels.layers
from asgiref.sync import async_to_sync

import kocherga.dateutils
from kocherga.dateutils import TZ
from kocherga.django.managers import RelayQuerySetMixin


# FIXME - copy-pasted from kocherga.events.signals, extract into common module
def channel_send(channel: str, message):
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.send)(channel, message)


class TicketQuerySet(RelayQuerySetMixin, models.QuerySet):
    pass


class TicketManager(models.Manager):
    def get_queryset(self):
        return TicketQuerySet(self.model, using=self._db)

    def register(self, user, event, subscribed_to_newsletter=False) -> 'Ticket':
        (ticket, _) = self.update_or_create(
            user=user,
            event=event,
            defaults={
                'status': 'ok',
                'subscribed_to_newsletter': subscribed_to_newsletter,
            },
        )

        ticket.send_confirmation_email()
        ticket.subscribe_to_newsletter_if_necessary()  # TODO - do asynchronously for faster response
        return ticket

    def unregister(self, user, event) -> 'Ticket':
        ticket = self.get(
            user=user,
            event=event,
        )
        ticket.status = 'cancelled'
        ticket.save()
        return ticket

    def send_reminders(self) -> None:
        tickets = self.filter(
            status='ok',
            event__start__gte=datetime.now(TZ),
            day_before_notification_sent=False,
        )

        now = datetime.now(TZ)
        if now.hour < 14:
            logger.info('Too early for day-before reminders')
            return

        logger.info(f'Trying {len(tickets)} tickets for day-before reminders')
        for ticket in tickets:
            ticket.send_day_before_reminder()


class Ticket(models.Model):
    event = models.ForeignKey(
        'Event',
        on_delete=models.PROTECT,
        related_name='tickets',
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    created = models.DateTimeField(auto_now_add=True, null=True)
    updated = models.DateTimeField(auto_now=True, null=True)

    status = models.CharField(
        max_length=20,
        choices=(
            ('ok', 'ОК'),
            ('inactive', 'Отказ'),
        ),
        default='ok',
    )

    subscribed_to_newsletter = models.BooleanField(default=False)
    day_before_notification_sent = models.BooleanField(default=False)

    from_timepad = models.BooleanField(default=False)

    objects = TicketManager()

    class Meta:
        unique_together = (
            ('event', 'user'),
        )
        permissions = (
            ('view_tickets', 'Может смотреть все билеты'),
        )

    def _common_email_vars(self):
        start_local = timezone.localtime(self.event.start)
        weekday = kocherga.dateutils.weekday(start_local)
        month = kocherga.dateutils.inflected_month(start_local)
        humanized_dt = f"{weekday}, {start_local.day} {month}\n"

        return {
            'event': self.event,
            'humanized_dt': humanized_dt,
            'event_link': f'{settings.KOCHERGA_WEBSITE}/events/{self.event.uuid}',
            'address_text': 'Москва, ул. Большая Дорогомиловская, д.5к2',  # TODO - move to config
        }

    def send_confirmation_email(self) -> None:
        if self.from_timepad:
            return

        template_vars = self._common_email_vars()

        text_body = render_to_string('events/email/registered.txt', template_vars)
        html_body = markdown.markdown(render_to_string('events/email/registered.md', template_vars))

        send_mail(
            subject=f'Регистрация на событие: {self.event.title}',
            from_email='Кочерга <info@kocherga-club.ru>',
            message=text_body,
            html_message=html_body,
            recipient_list=[self.user.email],
        )

    def should_send_reminder(self) -> bool:
        if self.day_before_notification_sent:
            return False

        if self.from_timepad:
            return False

        now = datetime.now(TZ)

        # shouldn't send the reminder at the same day as registration
        if (now.date() - timezone.localtime(self.created).date()).days < 1:
            logger.info('Skip reminder - ticket created today')
            return False

        # should never send reminders about past events
        if self.event.start < now:
            logger.info('Skip reminder - event is in the past')
            return False

        # too early or too late
        if (timezone.localtime(self.event.start).date() - now.date()).days != 1:
            return False

        return True

    def send_day_before_reminder(self) -> None:
        if not self.should_send_reminder():
            return

        # guarantee that we never send an email twice
        self.day_before_notification_sent = True
        self.save()

        template_vars = self._common_email_vars()

        text_body = render_to_string('events/email/day_before_reminder.txt', template_vars)
        html_body = markdown.markdown(render_to_string('events/email/day_before_reminder.md', template_vars))

        logger.info(f'Sending reminder to {self.user.email} about {self.event.id} ({self.event.title})')
        send_mail(
            subject=f'Напоминание о событии: {self.event.title}',
            from_email='Кочерга <info@kocherga-club.ru>',
            message=text_body,
            html_message=html_body,
            recipient_list=[self.user.email],
        )

    def subscribe_to_newsletter_if_necessary(self) -> None:
        if not self.subscribed_to_newsletter:
            logger.info('Not necessary to subscribe')
            return

        email = self.user.email

        channel_send("mailchimp-subscribe", {
            "type": "subscribe_to_main_list",
            "email": email,
        })
        logger.info(f'Scheduled subscription of {email}')
