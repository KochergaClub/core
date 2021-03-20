from datetime import datetime, timedelta

import factory
import pytest
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core import mail
from kocherga.dateutils import TZ
from kocherga.events.models import Event, Ticket


@pytest.fixture
def user1():
    return get_user_model().objects.create_user('kocherga-test@example.com')


@pytest.fixture
def user2():
    return get_user_model().objects.create_user('kocherga-test2@example.com')


class EventFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Event

    title = factory.Faker('sentence', nb_words=4)
    event_type = 'public'
    end = factory.LazyAttribute(lambda o: o.start + timedelta(hours=1))


@pytest.fixture
def tomorrow_event() -> Event:
    dt = datetime.now(TZ) + timedelta(days=1)
    return EventFactory.create(start=dt)


@pytest.fixture
def future_event() -> Event:
    dt = datetime.now(TZ) + timedelta(days=3)
    return EventFactory.create(start=dt)


@pytest.fixture(autouse=True)
def email_backend_setup():
    settings.EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'


@pytest.mark.xfail(reason="emails were moved to channels worker")
def test_register(user1, event):
    Ticket.objects.register(user=user1, event=event)
    assert len(mail.outbox) == 1
    assert mail.outbox[0].subject.startswith('Регистрация на событие')


def test_send_reminders(frozen_time, user1, user2, tomorrow_event, future_event):
    Ticket.objects.register(user=user1, event=tomorrow_event)
    Ticket.objects.register(user=user2, event=tomorrow_event)
    Ticket.objects.register(user=user1, event=future_event)
    Ticket.objects.register(user=user2, event=future_event)
    initial_reminders = 0  # should be 4, but emails were moved to async queue which is not processed in tests
    assert len(mail.outbox) == initial_reminders

    Ticket.objects.send_reminders()
    assert (
        len(mail.outbox) == initial_reminders
    )  # no reminders - events were just created

    frozen_time.tick(delta=timedelta(days=1))
    Ticket.objects.send_reminders()
    assert (
        len(mail.outbox) == initial_reminders
    )  # no reminders - future events are 2 days ahead

    frozen_time.tick(delta=timedelta(days=1))
    Ticket.objects.send_reminders()
    # FIXME - we rely here on frozen_time() fixture to be at 9:00, but that's hidden knowledge
    assert len(mail.outbox) == initial_reminders  # no reminders - it's not 14:00+ yet

    frozen_time.tick(delta=timedelta(hours=6))
    Ticket.objects.send_reminders()
    assert len(mail.outbox) == initial_reminders + 2

    assert mail.outbox[initial_reminders - 1].subject.startswith(
        'Регистрация на событие'
    )
    assert (
        mail.outbox[initial_reminders].subject
        == f'Напоминание о событии: {future_event.title}'
    )
    assert (
        mail.outbox[initial_reminders + 1].subject
        == f'Напоминание о событии: {future_event.title}'
    )

    Ticket.objects.send_reminders()
    assert len(mail.outbox) == initial_reminders + 2  # no additional reminders


def test_newsletter(user1, event):
    Ticket.objects.register(user=user1, event=event, subscribed_to_newsletter=True)

    # TODO - reset that subscription task is scheduled in channel
