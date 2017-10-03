import pytest

import kocherga.room
from kocherga.common import PublicError

class TestAllRooms:
    def test_type(self):
        assert type(kocherga.room.all_rooms) == type([])

    def test_geb(self):
        assert 'гэб' in kocherga.room.all_rooms

class TestPretty:
    def test_pretty_geb(self):
        assert kocherga.room.pretty('гэб') == 'ГЭБ'

    def test_pretty_lecture(self):
        assert kocherga.room.pretty('лекционная') == 'Лекционная'

    def test_pretty_unknown(self):
        with pytest.raises(PublicError, match='Unknown room неизвестная'):
            kocherga.room.pretty('неизвестная')

class TestNormalize:
    def test_normalize_room(self):
        assert kocherga.room.normalize('ЛЕТняя') == 'летняя'

    def test_normalize_room_space(self):
        assert kocherga.room.normalize('ЛЕТняя  ') == 'летняя'

    def test_normalize_room_no_fail(self):
        assert kocherga.room.normalize('Зимняя', fail=False) is None

    def test_normalize_room_fail(self):
        with pytest.raises(PublicError, match='Unknown room'):
            kocherga.room.normalize('Зимняя', fail=True)

    def test_normalize_room_default_fail(self):
        with pytest.raises(PublicError, match='Unknown room'):
            kocherga.room.normalize('Зимняя')

class TestDetails:
    def test(self):
        with pytest.raises(PublicError, match='Unknown room'):
            assert kocherga.room.details('blah')

    def test(self):
        assert kocherga.room.details('летняя')['area'], 9
