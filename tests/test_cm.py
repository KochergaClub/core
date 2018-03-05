import kocherga.cm

def test_now_count():
    c = kocherga.cm.now_count()
    assert type(c) == int

def test_load_customers():
    customers = kocherga.cm.load_customers()
    assert type(customers) == list
    assert len(customers) > 10
    assert customers[0]['Номер Карты'] == '1'

def test_load_orders():
    orders = kocherga.cm.load_orders()
    assert type(orders) == list
    assert len(orders) > 10
    assert type(orders[0]) == kocherga.cm.Order
