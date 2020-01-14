import kocherga.staff.tools


class TestTeam:
    def test_members(self, common_team):
        members = kocherga.staff.tools.members()
        assert type(members) == list

        assert 'Элиезер' in [m.short_name for m in members]
        assert len(members) >= 2
        assert len([m for m in members if m.is_current]) == len(members)

    def test_members_former(self, common_team):
        members = kocherga.staff.tools.members(include_former=True)
        assert type(members) == list

        assert 'Элиезер' in [m.short_name for m in members]
        assert len(members) >= 3
        assert len([m for m in members if m.is_current]) != len(members)

    def test_member_by_short_name(self, common_team):
        assert kocherga.staff.tools.find_member_by_short_name('Скотт')

    def test_member_by_short_name_unknown(self, common_team):
        assert kocherga.staff.tools.find_member_by_short_name('Неизвестный') is None

    def test_member_by_short_name_former(self, common_team):
        assert kocherga.staff.tools.find_member_by_short_name('Валка') is None

    def test_member_by_email(self, common_team):
        assert kocherga.staff.tools.find_member_by_email('test@kocherga-club.ru')

    def test_member_by_alt_email(self, common_team):
        assert kocherga.staff.tools.find_member_by_email('mmcleric@gmail.com')

    def test_member_by_email_unknown(self, common_team):
        assert kocherga.staff.tools.find_member_by_email('somebody@gmail.com') is None
