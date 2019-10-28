import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
]

from datetime import datetime, timedelta

from django.conf import settings
from django.core import mail
from django.contrib.auth import get_user_model

from kocherga.dateutils import TZ
from kocherga.events.models import Event, Ticket


@pytest.fixture
def user1():
    return get_user_model().objects.create_user('kocherga-test@berekuk.ru')


@pytest.fixture
def user2():
    return get_user_model().objects.create_user('kocherga-test2@berekuk.ru')


@pytest.fixture
def tomorrow_event() -> Event:
    dt = datetime.now(TZ) + timedelta(days=1)
    return Event.objects.create(
        start=dt,
        end=dt + timedelta(hours=1),
        title='Завтрашнее событие',
        event_type='public',
    )


@pytest.fixture
def future_event() -> Event:
    dt = datetime.now(TZ) + timedelta(days=3)
    return Event.objects.create(
        start=dt,
        end=dt + timedelta(hours=1),
        title='Будущее событие',
        event_type='public',
    )


@pytest.fixture(autouse=True)
def email_backend_setup():
    settings.EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'


def test_register(user1, event):
    Ticket.objects.register(user=user1, event=event)
    assert len(mail.outbox) == 1
    assert mail.outbox[0].subject == 'Регистрация на событие'


def test_send_reminders(user1, user2, tomorrow_event, future_event):
    Ticket.objects.register(user=user1, event=tomorrow_event)
    Ticket.objects.register(user=user2, event=tomorrow_event)
    Ticket.objects.register(user=user2, event=future_event)
    assert len(mail.outbox) == 3

    Ticket.objects.send_reminders()

    assert len(mail.outbox) == 5  # 3 registrations and 2 reminders
    assert mail.outbox[2].subject.startswith('Регистрация на событие')
    assert mail.outbox[3].subject == f'Напоминание о событии: {tomorrow_event.title}'
    assert mail.outbox[4].subject == f'Напоминание о событии: {tomorrow_event.title}'

    Ticket.objects.send_reminders()
    assert len(mail.outbox) == 5  # no additional reminders


def test_newsletter(user1, event):
    Ticket.objects.register(user=user1, event=event, subscribed_to_newsletter=True)

    # TODO - reset that subscription task is scheduled in channel
