import datetime


def test_uid(ticket):
    assert ticket.uid()


def test_default_status(ticket):
    assert ticket.status == 'normal'


def test_default_created(ticket):
    assert type(ticket.created) == datetime.datetime
