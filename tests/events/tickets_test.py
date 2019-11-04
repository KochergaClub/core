import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
]

from datetime import datetime, timedelta

import freezegun
import factory

from django.conf import settings
from django.core import mail
from django.contrib.auth import get_user_model

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
    end = factory.LazyAttribute(
        lambda o: o.start + timedelta(hours=1)
    )


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


def test_register(user1, event):
    Ticket.objects.register(user=user1, event=event)
    assert len(mail.outbox) == 1
    assert mail.outbox[0].subject.startswith('Регистрация на событие')


@pytest.fixture()
def frozen_time():
    with freezegun.freeze_time(datetime(
            year=2019,
            month=11,
            day=1,
            hour=9,
            tzinfo=TZ
    )) as f:
        yield f


def test_send_reminders(frozen_time, user1, user2, tomorrow_event, future_event):
    Ticket.objects.register(user=user1, event=tomorrow_event)
    Ticket.objects.register(user=user2, event=tomorrow_event)
    Ticket.objects.register(user=user1, event=future_event)
    Ticket.objects.register(user=user2, event=future_event)
    assert len(mail.outbox) == 4

    Ticket.objects.send_reminders()
    assert len(mail.outbox) == 4  # no reminders - events were just created

    frozen_time.tick(delta=timedelta(days=1))
    Ticket.objects.send_reminders()
    assert len(mail.outbox) == 4  # no reminders - future events are 2 days ahead

    frozen_time.tick(delta=timedelta(days=1))
    Ticket.objects.send_reminders()
    assert len(mail.outbox) == 4  # no reminders - it's not 14:00+ yet

    frozen_time.tick(delta=timedelta(hours=6))
    Ticket.objects.send_reminders()
    assert len(mail.outbox) == 6  # no reminders - it's not 14:00+ yet

    assert mail.outbox[3].subject.startswith('Регистрация на событие')
    assert mail.outbox[4].subject == f'Напоминание о событии: {future_event.title}'
    assert mail.outbox[5].subject == f'Напоминание о событии: {future_event.title}'

    Ticket.objects.send_reminders()
    assert len(mail.outbox) == 6  # no additional reminders


def test_newsletter(user1, event):
    Ticket.objects.register(user=user1, event=event, subscribed_to_newsletter=True)

    # TODO - reset that subscription task is scheduled in channel
