import pytest
pytestmark = pytest.mark.usefixtures('db')


def test_uid(ticket):
    assert ticket.uid()


def test_default_status(ticket):
    assert ticket.status == 'normal'
