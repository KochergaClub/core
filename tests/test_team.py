import kocherga.team

class TestTeam:
    def test_members(self):
        members = kocherga.team.members()
        assert type(members) == list

        assert members[0].short_name == 'Элиезер'
        assert len(members) >= 2
        assert len([m for m in members if m.status == 'Текущий']) == len(members)

    def test_members_all(self):
        members = kocherga.team.members(status=None)
        assert type(members) == list

        assert members[0].short_name == 'Элиезер'
        assert len(members) >= 3
        assert len([m for m in members if m.status == 'Текущий']) != len(members)

    def test_slack_ids(self):
        assert kocherga.team.check_slack_ids() >= 1

    def test_member_by_short_name(self):
        assert kocherga.team.find_member_by_short_name('Скотт')

    def test_member_by_short_name_unknown(self):
        assert kocherga.team.find_member_by_short_name('Неизвестный') is None

    def test_member_by_short_name_former(self):
        assert kocherga.team.find_member_by_short_name('Валка') is None

    def test_member_by_email(self):
        assert kocherga.team.find_member_by_email('slava@kocherga-club.ru')

    def test_member_by_email_unknown(self):
        assert kocherga.team.find_member_by_email('somebody@gmail.com') is None
