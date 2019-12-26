# GraphQL

Используем [Apollo](https://www.apollographql.com/).

## GraphQL-сервер

В качестве GraphQL-сервера пока что выступает Apollo Server, вызывающий старое REST API на Django REST Framework.

Но потенциально можно будет переехать на [graphene-django](https://github.com/graphql-python/graphene-django).

Сервер работает прямо в контексте `render-server`-процесса (того же, который отвечает за роутинг и верстает HTML-страницы с помощью Next.JS).

## GraphQL-клиент

Используем Apollo Client с React-хуками.

Хуки генерируются с помощью [GraphQL code generator](https://graphql-code-generator.com/).
