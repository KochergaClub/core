import pytest
pytestmark = pytest.mark.usefixtures('db')

import kocherga.cm.models
import kocherga.cm.scraper
import kocherga.cm.importer

def test_now_stats():
    c = kocherga.cm.scraper.now_stats()
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
    assert type(orders[0]) == kocherga.cm.models.Order

def test_load_customer():
    customer = kocherga.cm.scraper.load_customer_from_html(40)
    assert customer

@pytest.mark.slow
@pytest.mark.django_db(transaction=True)
def test_importer():
    kocherga.cm.importer.Importer(log_portion_size=3).import_new()
    assert len(kocherga.cm.models.Order.objects.all()) > 10
    assert len(kocherga.cm.models.Customer.objects.all()) > 10
