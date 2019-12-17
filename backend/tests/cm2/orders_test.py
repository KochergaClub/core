import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
]

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
