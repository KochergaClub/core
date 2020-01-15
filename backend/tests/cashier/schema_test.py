from tests.helpers.graphql import run_query


PAYMENTS_QUERY = """
{
    cashierPayments(first: 10) {
        nodes {
            id
        }
    }
}
"""


def test_payments(admin_client):
    run_query(
        admin_client,
        PAYMENTS_QUERY
    )
