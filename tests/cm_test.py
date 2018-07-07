import pytest
pytestmark = pytest.mark.usefixtures('db')

import kocherga.cm
from kocherga.db import Session

def test_now_count():
    c = kocherga.cm.now_count()
    assert type(c) == int

def test_load_customers():
    customers = kocherga.cm.load_customers()
    assert type(customers) == list
    assert len(customers) > 10
    assert customers[0].card_id == 1

def test_load_orders():
    orders = kocherga.cm.load_orders()
    assert type(orders) == list
    assert len(orders) > 10
    assert type(orders[0]) == kocherga.cm.Order

def test_load_customer():
    customer = kocherga.cm.load_customer_from_html(40)
    print(customer)

@pytest.mark.slow
def test_importer():
    kocherga.cm.Importer().import_new()
    assert len(Session().query(kocherga.cm.Order).all()) > 10
    assert len(Session().query(kocherga.cm.Customer).all()) > 10
