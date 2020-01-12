from tests.helpers.graphql import run_query
import kocherga.cm.auth


def test_now(client):
    kocherga.cm.auth.update_cookies()
    data = run_query(client, "{ now { total } }")

    assert data['now']['total'] >= 0
