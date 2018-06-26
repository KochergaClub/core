import pytest
pytestmark = pytest.mark.usefixtures('db')

from kocherga.events.prototype import EventPrototype
from kocherga.db import Session

def test_suggestions(common_prototype):
    ep = common_prototype
    print(ep.suggested_dates())
    assert type(ep.suggested_dates()) == list

def test_new_event(common_prototype):
    ep = common_prototype
    dt = ep.suggested_dates()[0]
    event = ep.new_event(dt)
    Session().commit()

def test_to_dict(common_prototype):
    ep = common_prototype
    assert type(ep.to_dict()) == dict
    assert type(ep.to_dict(detailed=True)) == dict
