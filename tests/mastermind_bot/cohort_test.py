import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,
]

from datetime import datetime
import factory

from django.contrib.auth import get_user_model

from kocherga.dateutils import TZ
from kocherga.mastermind_dating.models import Cohort, Participant
from kocherga.timepad.models import Event as TimepadEvent, Order as TimepadOrder

KchUser = get_user_model()


class TimepadEventFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = TimepadEvent

    name = factory.Faker('sentence', nb_words=4)
    id = factory.Sequence(lambda n: n)


class TimepadOrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = TimepadOrder

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    status = 'ok'
    created_at = factory.LazyFunction(lambda: datetime.now(TZ))
    subscribed_to_newsletter = False
    id = factory.Sequence(lambda n: n)


@pytest.fixture
def event_with_timepad(event, common_team):
    ann = event.timepad_announcement
    ann.link = 'https://kocherga-dev.timepad.ru/event/111'
    ann.save()

    timepad_event = TimepadEventFactory.create(id=111)

    TimepadOrderFactory.create(
        event=timepad_event,
        user=KchUser.objects.get(email='yudkowsky@example.com'),
    )
    TimepadOrderFactory.create(
        event=timepad_event,
        user=KchUser.objects.get(email='test@kocherga-club.ru'),
    )

    return event


def test_populate_from_event(event_with_timepad):
    cohort = Cohort.objects.create(event=event_with_timepad)
    cohort.populate_from_event()

    assert Participant.objects.all().count() == 2
