import pytest
pytestmark = pytest.mark.usefixtures('db')

from kocherga.cm.models import Customer

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
    assert len(Customer.objects.all()) == 3
    assert len(Customer.objects.active()) == 2
