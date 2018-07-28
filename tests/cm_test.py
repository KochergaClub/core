import pytest
pytestmark = pytest.mark.usefixtures('db')

import kocherga.cm
import kocherga.cm.model
import kocherga.cm.importer
from kocherga.db import Session

def test_now_stats():
    c = kocherga.cm.now_stats()
    assert type(c["total"]) == int

def test_load_customers():
    customers = kocherga.cm.importer.load_customers()
    assert type(customers) == list
    assert len(customers) > 10
    assert customers[0].card_id == 1

def test_load_orders():
    orders = kocherga.cm.importer.load_orders()
    assert type(orders) == list
    assert len(orders) > 10
    assert type(orders[0]) == kocherga.cm.model.Order

def test_load_customer():
    customer = kocherga.cm.load_customer_from_html(40)
    assert customer

@pytest.mark.slow
def test_importer():
    kocherga.cm.Importer(log_portion_size=3).import_new()
    assert len(Session().query(kocherga.cm.model.Order).all()) > 10
    assert len(Session().query(kocherga.cm.model.Customer).all()) > 10
