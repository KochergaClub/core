import pytest

from kocherga.cm.models import Customer

from django.utils.timezone import make_aware
from datetime import datetime, date


@pytest.fixture
def make_customer():
    counter = 0

    def _make(name, **kwargs):
        nonlocal counter
        counter += 1
        params = dict(
            first_name=name,
            last_name=name,
            customer_id=counter,
            card_id=counter,
            is_active=True,
            time_discount=0,
            goods_discount=0,
            total_spent=0,
            mailing_list=True,
        )
        params.update(kwargs)
        Customer.objects.create(**params)
    return _make


def test_query_active(make_customer):
    make_customer('foo')
    make_customer('bar')
    make_customer('baz', is_active=False)
    assert Customer.objects.all().count() == 3
    assert Customer.objects.active().count() == 2


def test_query_from_date(make_customer):
    make_customer(
        'foo',
        activity_started=make_aware(
            datetime(2019, 2, 1, 14, 30)
        ),
    )
    make_customer(
        'foo2',
        activity_started=make_aware(
            datetime(2019, 2, 1, 0, 30)
        ),
    )
    make_customer(
        'foo3',
        activity_started=make_aware(
            datetime(2019, 2, 1, 23, 30)
        ),
    )
    make_customer(
        'bar',
        activity_started=make_aware(
            datetime(2019, 2, 10, 14, 30)
        ),
    )
    assert Customer.objects.from_date(date(2019, 2, 1)).count() == 3
