import pytest

import kocherga.cm.auth
import kocherga.cm.tools
import kocherga.cm.models
import kocherga.cm.importer


def user_exists(login):
    return len([u for u in kocherga.cm.importer.load_users() if u.login == login]) == 1


@pytest.mark.slow
def test_add_manager(cm_auth):
    login = 'test1'
    assert not user_exists(login)

    user = kocherga.cm.tools.add_manager(
        login, 'Тест Тестов', 'test_password', 'test@example.com'
    )
    assert isinstance(user, kocherga.cm.models.User)
    assert user_exists(login)

    kocherga.cm.tools.delete_manager(user)
    assert not user_exists(login)
