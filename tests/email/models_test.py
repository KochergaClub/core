import pytest
pytestmark = [
    pytest.mark.mailchimp,
]

from kocherga.email.models import MailchimpMember

def test_get_from_mailchimp_empty():
    member = MailchimpMember.get_from_mailchimp('unknown@example.com')
    assert member.status == 'none'

# TODO - create mailchimp member and test non-empty get
