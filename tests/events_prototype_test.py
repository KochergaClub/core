import pytest
pytestmark = pytest.mark.usefixtures('db')

from kocherga.events.prototype import EventPrototype
from kocherga.events.prototype_tag import EventPrototypeTag
from kocherga.db import Session

def test_suggestions(common_prototype):
    ep = common_prototype
    assert type(ep.suggested_dates()) == list

def test_new_event(common_prototype):
    ep = common_prototype
    dt = ep.suggested_dates()[0]
    event = ep.new_event(dt)
    assert event.prototype_id == ep.prototype_id
    Session().commit()

def test_to_dict(common_prototype):
    ep = common_prototype
    assert type(ep.to_dict()) == dict
    assert type(ep.to_dict(detailed=True)) == dict

def test_cancel(common_prototype):
    ep = common_prototype

    suggested = ep.suggested_dates()
    ep.cancel_date(suggested[2].date())

    suggested2 = ep.suggested_dates()
    assert suggested[0] == suggested2[0]
    assert suggested[1] == suggested2[1]
    assert suggested[2] != suggested2[2]
    assert suggested[3] == suggested2[2]

class TestTags:
    def test_list_default_tags(self, common_prototype):
        assert common_prototype.tags == []

    def test_set_tags(self, common_prototype):
        common_prototype.tags.append(EventPrototypeTag(name='foo'))
        common_prototype.tags.append(EventPrototypeTag(name='bar'))
        Session().commit()
        prototype_id = common_prototype.prototype_id

        Session.remove()
        common_prototype = Session().query(EventPrototype).filter_by(prototype_id=prototype_id).first()
        assert len(common_prototype.tags) == 2
        assert common_prototype.tags[0].name == 'bar' # tags are sorted by name
        assert common_prototype.tags[1].name == 'foo'
