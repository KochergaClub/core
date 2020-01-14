from tests.helpers.graphql import run_query


def test_index(admin_client):
    run_query(
        admin_client,
        """
        {
            zadarmaPbxCalls(first: 10) {
                nodes {
                    pbx_call_id
                }
            }
        }
        """
    )
