import pytest

import kocherga.cm.models
import kocherga.cm.scraper
import kocherga.cm.tools
import kocherga.cm.importer


def test_now_stats(cm_auth):
    c = kocherga.cm.tools.now_stats()
    assert type(c["total"]) == int


@pytest.mark.slow
def test_load_customers(cm_auth):
    customers = kocherga.cm.importer.load_customers()
    assert type(customers) == list
    assert len(customers) > 10
    assert customers[0].card_id == 1


@pytest.mark.slow
def test_load_orders(cm_auth):
    orders = kocherga.cm.importer.load_orders()
    assert type(orders) == list
    assert len(orders) > 10
    assert type(orders[0]) == kocherga.cm.models.Order


@pytest.mark.slow
def test_load_customer(cm_auth):
    customer = kocherga.cm.scraper.load_customer_from_html(40)
    assert customer


@pytest.mark.slow
@pytest.mark.mailchimp
def test_importer(cm_auth):
    kocherga.cm.importer.Importer(log_portion_size=3).import_new()
    assert len(kocherga.cm.models.Order.objects.all()) > 10
    assert len(kocherga.cm.models.Customer.objects.all()) > 10
