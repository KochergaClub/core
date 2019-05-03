import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,
]

from kocherga.events.models import EventPrototype


def test_suggestions(common_prototype):
    ep = common_prototype
    assert type(ep.suggested_dates()) == list


def test_new_event(common_prototype):
    ep = common_prototype
    dt = ep.suggested_dates()[0]
    event = ep.new_event(dt)
    assert event.prototype_id == ep.prototype_id


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
        assert list(common_prototype.tags.all()) == []

    def test_set_tags(self, common_prototype):
        common_prototype.add_tag('foo')
        common_prototype.add_tag('bar')
        prototype_id = common_prototype.prototype_id

        common_prototype = EventPrototype.objects.get(pk=prototype_id)
        assert len(list(common_prototype.tags.all())) == 2
        tags = list(common_prototype.tags.all())
        assert tags[0].name == 'bar'  # tags are sorted by name (why?)
        assert tags[1].name == 'foo'
