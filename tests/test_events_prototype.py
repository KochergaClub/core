import pytest
pytestmark = pytest.mark.usefixtures('db')

from kocherga.events.prototype import EventPrototype
from kocherga.db import Session

def test_suggestions():
    ep = EventPrototype(title='foo', weekday=3, hour=20, minute=30, length=30)
    print(ep.suggested_dates())
    assert type(ep.suggested_dates()) == list

def test_new():
    ep = EventPrototype(title='foo', weekday=3, hour=20, minute=30, length=30)
    dt = ep.suggested_dates()[0]
    event = ep.new_event(dt)
    Session().commit()
