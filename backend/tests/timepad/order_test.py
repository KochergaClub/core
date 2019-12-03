from . import factories

from django.contrib.auth import get_user_model


def test_create_native(frozen_time, minimal_event):
    event = factories.EventFactory.create()
    user = get_user_model().objects.create_user('test@example.com')
    order = factories.OrderFactory.create(event=event, user=user)

    kocherga_event = minimal_event
    kocherga_event.timepad_announcement.link = event.link()
    kocherga_event.timepad_announcement.save()

    frozen_time.tick()

    order.create_native_ticket()
    assert kocherga_event.tickets.count() == 1

    ticket = kocherga_event.tickets.first()
    assert ticket.event == kocherga_event
    assert ticket.user == order.user
    assert ticket.created == order.created_at
    assert ticket.from_timepad is True

    order.create_native_ticket()
    assert kocherga_event.tickets.count() == 1
