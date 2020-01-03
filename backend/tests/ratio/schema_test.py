from tests.helpers.graphql import run_query


def test_ratioEmptyTrainings():
    (success, response) = run_query("{ ratioTrainings { edges { node { id } } } }")

    assert(success)


def test_ratioTrainings():
    (success, response) = run_query("""
    mutation Foo {
      ratioAddTraining {
        ...
      }
    }
 """)

    assert(success)

    (success, response) = run_query("{ ratioTrainings { edges { node { id } } } }")

    assert(success)
