import pytest
pytestmark = [
    pytest.mark.mailchimp,
]

from datetime import date

from kocherga.events.models import WeeklyDigest


def test_get_current():
    c = WeeklyDigest.objects.current_digest()
    assert type(c.start) == date
    assert type(c.end) == date


def test_mailchimp_draft():
    c = WeeklyDigest.objects.current_digest()
    c.post_mailchimp_draft()
    assert c.mailchimp_id


def test_vk():
    c = WeeklyDigest.objects.current_digest()
    c.post_vk('')
    assert c.vk_id
