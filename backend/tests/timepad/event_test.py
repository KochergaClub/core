from . import factories


def test_link():
    event = factories.EventFactory.create()
    assert event.link() == 'https://kocherga-dev.timepad.ru/event/' + str(event.id)
