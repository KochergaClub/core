import pytest
pytestmark = pytest.mark.django_db

from freezegun import freeze_time

from kocherga.money.salaries import calculate_new_salaries


def test_empty_new_salaries():
    with freeze_time('2019-03-05 10:00'):
        salaries = calculate_new_salaries()
    print(salaries)
    assert salaries
