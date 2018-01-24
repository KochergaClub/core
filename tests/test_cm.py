import kocherga.cm

def test_now_count():
    c = kocherga.cm.now_count()
    assert type(c) == int

def test_load_customers():
    customers = kocherga.cm.load_customers()
    assert type(customers) == list
    assert len(customers) > 10
    assert customers[0]['Номер Карты'] == '1'
