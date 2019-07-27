import pytest
pytestmark = pytest.mark.usefixtures('db')

from django.contrib.auth import get_user_model

from kocherga.mastermind_dating.models import Group, Cohort, User


def test_get_empty():
    g1 = Group.objects.create(telegram_invite_link='abc')
    Group.objects.create(telegram_invite_link='def')

    assert Group.objects.get_empty().telegram_invite_link == 'abc'

    user = User.objects.create(
        group=g1,
        user=get_user_model().objects.create_user('test@example.com'),
    )
    user.cohorts.add(Cohort.objects.create())

    assert Group.objects.get_empty().telegram_invite_link == 'def'
