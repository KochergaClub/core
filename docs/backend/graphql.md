# Draft

Черновое API для самописной обёртки над graphql-core.

```python
from kocherga.graphql import helpers

Mutations = helpers.Collection(prefix='auth')

# helper знает имя поля и позволяет упростить создание Input и Result.
@Mutations.field
def Login(helper):
    def resolve():
        ...

    # Input автоматом получит имя AuthLoginInput.
    Input = helper.input({
        'email': str,
        'password': str,
    })

    # Result автоматом получит имя AuthLoginResult.
    Result = helper.result({
        'ok': bool,
        'error': str,
        # Должна быть возможность передавать другие типы. Код helper'а проверяет, является ли тип built-in'ом, и если да, то заменяет его на graphql.GraphQLBoolean и т.д.
    })

    return helper.build(Result, args={'input': Input}, resolve=resolve)

# Код в kocherga.graphql.schema не должен знать о helper'ах, чтобы упростить будущие рефакторинги.
mutations = mutations.as_dict()
```
