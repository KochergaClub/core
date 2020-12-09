from tests.helpers.graphql import run_query


def test_empty_trainings(client, admin_user):
    client.force_login(admin_user)
    run_query(client, "{ ratioTrainings(first: 10) { edges { node { id } } } }")


def test_nonempty_trainings(client, admin_user):
    client.force_login(admin_user)
    result = run_query(
        client,
        """
    mutation AppliedSolstice {
      result: createRatioTraining(input: {
        name: "Прикладное солнцестояние"
        slug: "solstice-training"
        date: "2020-12-21"
        telegram_link: "http://whatever.com"
      }) {
        __typename
      }
    }
 """,
    )
    assert result['result']['__typename'] == 'RatioTraining'

    run_query(client, "{ ratioTrainings(first: 10) { edges { node { id } } } }")
