import pytest
pytestmark = [
    pytest.mark.mailchimp,
]

import kocherga.mailchimp

def test_interest_category_by_name():
    category = kocherga.mailchimp.interest_category_by_name('Подписки')
    assert category['title'] == 'Подписки'
    assert type(category['id']) is str

def test_interest_by_name():
    category = kocherga.mailchimp.interest_category_by_name('Подписки')
    category_id = category['id']

    interest = kocherga.mailchimp.interest_by_name(category_id, 'Материалы и новости')
    assert interest['name'] == 'Материалы и новости'
    assert type(interest['id']) is str


def test_get_interests():
    category = kocherga.mailchimp.interest_category_by_name('Подписки')
    category_id = category['id']

    interests = kocherga.mailchimp.get_interests(category_id)
    assert type(interests) is list
    assert len(interests) >= 3
