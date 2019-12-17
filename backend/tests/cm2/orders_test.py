import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
]

from datetime import timedelta

from kocherga.cm2.models import Order


def test_close():
    order = Order.objects.create()
    order.close()
    assert order.end is not None


def test_filter_by_status():
    orders = []
    for i in range(3):
        orders.append(Order.objects.create())

    assert Order.objects.all().filter_by_status('open').count() == 3
    assert Order.objects.all().filter_by_status('closed').count() == 0
    orders[2].close()
    assert Order.objects.all().filter_by_status('open').count() == 2
    assert Order.objects.all().filter_by_status('closed').count() == 1


def test_value(frozen_time):
    order = Order.objects.create()

    assert order.value == 0

    frozen_time.tick(delta=timedelta(hours=1))
    assert order.value == 150
    assert order.stored_value is None

    order.close()
    assert order.value == 150
    assert order.stored_value == 150
