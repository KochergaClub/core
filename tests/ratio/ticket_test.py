import pytest
pytestmark = pytest.mark.usefixtures('db')

import datetime


def test_uid(ticket):
    assert ticket.uid()


def test_default_status(ticket):
    assert ticket.status == 'normal'


def test_default_registration_date(ticket):
    assert type(ticket.registration_date) == datetime.date
