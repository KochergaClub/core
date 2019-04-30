import pytest
pytestmark = [
    pytest.mark.django_db,
    pytest.mark.google,
]

import kocherga.staff.tools


class TestPermissions:
    def test_grant_permissions_not_watchman(self, common_team):
        member = kocherga.staff.tools.find_member_by_email('yudkowsky@example.com')
        with pytest.raises(Exception, match='Only WATCHMAN'):
            member.grant_google_permissions()

    def test_grant_permissions(self, common_team):
        member = kocherga.staff.tools.find_member_by_email('mmcleric@gmail.com')
        member.grant_google_permissions()
