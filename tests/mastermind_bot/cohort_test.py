import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,
]

from django.contrib.auth import get_user_model
from kocherga.mastermind_dating.models import Cohort, User
from kocherga.timepad.models import Event as TimepadEvent, Order as TimepadOrder

KchUser = get_user_model()


@pytest.fixture
def event_with_timepad(event, common_team):
    print(event)
    event.posted_timepad = 'https://kocherga-dev.timepad.ru/event/111'
    event.save()

    timepad_event = TimepadEvent.objects.create(
        id=111,
        name='abc',
    )

    TimepadOrder.objects.create(
        id=1,
        event=timepad_event,
        first_name='Eliezer',
        last_name='Yudkowsky',
        status='ok',
        user=KchUser.objects.get(email='yudkowsky@example.com'),
    )
    TimepadOrder.objects.create(
        id=2,
        event=timepad_event,
        first_name='Test',
        last_name='User',
        status='ok',
        user=KchUser.objects.get(email='test@kocherga-club.ru'),
    )

    return event


def test_event_with_timepad(event_with_timepad):
    assert event_with_timepad.timepad_event().id == 111


def test_populate_from_event(event_with_timepad):
    cohort = Cohort.objects.create(event=event_with_timepad)
    cohort.populate_from_event()

    assert User.objects.all().count() == 2
