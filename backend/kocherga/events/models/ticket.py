import logging

logger = logging.getLogger(__name__)

import urllib.parse
from datetime import datetime
from typing import Optional

import kocherga.auth.utils
import kocherga.dateutils
import kocherga.email.channels
import reversion
from django.conf import settings
from django.core.mail import send_mail
from django.db import models, transaction
from django.template.loader import render_to_string
from django.utils import timezone
from kocherga.dateutils import TZ
from kocherga.django.managers import RelayQuerySetMixin
from kocherga.email.tools import mjml2html


class TicketQuerySet(RelayQuerySetMixin, models.QuerySet):
    pass


class TicketManager(models.Manager):
    def get_queryset(self):
        return TicketQuerySet(self.model, using=self._db)

    def register(
        self,
        user,
        event,
        subscribed_to_newsletter=False,
        signed_in: Optional[bool] = None,
    ) -> 'Ticket':
        (ticket, _) = self.update_or_create(
            user=user,
            event=event,
            defaults={
                'status': 'ok',
                'subscribed_to_newsletter': subscribed_to_newsletter,
            },
        )

        def on_commit():
            ticket.job_send_confirmation_email(signed_in=signed_in)
            ticket.job_subscribe_to_newsletter_if_necessary()

        transaction.on_commit(on_commit)

        return ticket

    def unregister(self, user, event) -> 'Ticket':
        ticket = self.get(
            user=user,
            event=event,
        )
        ticket.status = 'inactive'
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


@reversion.register()
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
        unique_together = (('event', 'user'),)
        permissions = (('view_tickets', 'Может смотреть все билеты'),)

    def _common_email_vars(self, signed_in: Optional[bool] = None):
        start_local = timezone.localtime(self.event.start)
        weekday = kocherga.dateutils.inflected_weekday(start_local)
        month = kocherga.dateutils.inflected_month(start_local)
        humanized_dt = f"{weekday}, {start_local.day} {month}, {start_local:%H:%M}\n"

        if signed_in:
            lk_link = f'{settings.KOCHERGA_WEBSITE}/my'
        else:
            magic_token = kocherga.auth.utils.get_magic_token(self.user.email)
            params_str = urllib.parse.urlencode({'token': magic_token, 'next': '/my'})
            lk_link = f'{settings.KOCHERGA_WEBSITE}/login/magic-link' + '?' + params_str

        return {
            'event': self.event,
            'now': datetime.now(tz=TZ),
            'humanized_dt': humanized_dt,
            'event_link': f'{settings.KOCHERGA_WEBSITE}/events/{self.event.uuid}',
            'lk_link': lk_link,
            'signed_in': signed_in,
            'address_text': 'Москва, ул. Большая Дорогомиловская, д.5к2',  # TODO - move to config
        }

    # slow, should be called from background workers only
    def send_confirmation_email(self, signed_in: Optional[bool] = None) -> None:
        if self.from_timepad:
            return

        template_vars = self._common_email_vars(signed_in=signed_in)

        text_body = render_to_string('events/email/registered.txt', template_vars)
        html_body = mjml2html(
            render_to_string('events/email/registered.mjml', template_vars)
        )

        logger.info(
            f'Sending confirmation email to {self.user.email} for event {self.event.uuid} ({self.event.title})'
        )
        send_mail(
            subject=f'Регистрация на событие: {self.event.title}',
            from_email='Кочерга <info@kocherga-club.ru>',
            message=text_body,
            html_message=html_body,
            recipient_list=[self.user.email],
        )
        logger.info(f'Confirmation email sent to {self.user.email}')

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

    # slow, should be called from background workers only
    def send_day_before_reminder(self) -> None:
        if not self.should_send_reminder():
            return

        # guarantee that we never send an email twice
        self.day_before_notification_sent = True
        self.save()

        template_vars = self._common_email_vars()

        text_body = render_to_string(
            'events/email/day_before_reminder.txt', template_vars
        )
        html_body = mjml2html(
            render_to_string('events/email/day_before_reminder.mjml', template_vars)
        )

        logger.info(
            f'Sending reminder to {self.user.email} about {self.event.id} ({self.event.title})'
        )
        send_mail(
            subject=f'Напоминание о событии: {self.event.title}',
            from_email='Кочерга <info@kocherga-club.ru>',
            message=text_body,
            html_message=html_body,
            recipient_list=[self.user.email],
        )

    def job_subscribe_to_newsletter_if_necessary(self) -> None:
        if not self.subscribed_to_newsletter:
            logger.info('Not necessary to subscribe')
            return

        email = self.user.email

        kocherga.email.channels.subscribe_to_main_list(email=email)
        logger.info(f'Scheduled subscription of {email}')

    def job_send_confirmation_email(self, signed_in: bool):
        from ..channels import job_send_ticket_confirmation_email

        job_send_ticket_confirmation_email(self.pk, signed_in=signed_in)

    @property
    def zoom_link(self):
        if self.status != 'ok':
            return None
        return self.event.zoom_link
