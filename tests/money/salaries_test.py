import pytest
pytestmark = pytest.mark.django_db

from kocherga.money.salaries import calculate_new_salaries


def test_empty_new_salaries():
    salaries = calculate_new_salaries()
    print(salaries)
    assert salaries
