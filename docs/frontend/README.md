# Фронтенд Кочерги

Фронтенд Кочерги написан на React, Typescript, [NextJS](https://nextjs.org/) и [Apollo Client](https://www.apollographql.com/docs/react/).

## Организация файлов

Весь фронтенд-код располагается в директории `src`. Небольшое количество серверного кода расположено в директории `server`.

### Корневые директории

- `apollo/` - включает `apollo/client`, стандартную обёртку для Apollo-powered страниц.
- `components/` - общие React-компоненты.
- `common/` - общий JS-код, не специфичный для React'а или Redux'а.
- `common/hooks/` - React hooks.
- `pages/` - NextJS pages. Все файлы, кроме `_app`, `document` и `_error`, делегируют код страниц файлам в APPNAME/pages/APPNAME/pages/\*.
- `wagtail/` и `cms/` - общие компоненты wagtail-блоков и страниц (компоненты для отображения конкретных wagtail-страниц живут в директориях `*/wagtail/`)
- `render/` - серверный код для SSR и роутинга

Если директория не указана ниже, то скорее всего это директория "приложения", например, `ratio/` или `events/`. По аналогии с Django-приложениями, каждое приложение отвечает за отдельный аспект сайта.

### Организация файлов в приложении

- `components/` - общие React-компоненты.
- `pages/` - отдельные NextJS-страницы (используются из NextJS-страниц).
- `wagtail/` - Wagtail-страницы (импортируются в `cms/utils.ts`).

Apollo:

- `queries.graphql` - fragments, queries и mutations для GraphQL.
- `queries.generated.ts` - типы и хуки, сгенерированные с помощью [GraphQL code generator](https://graphql-code-generator.com/).

Прочее (редко встречающееся):

- `types.ts` - TypeScript-типы. Обычно не нужны, потому что бекендовые типы есть в `queries.generated.ts` в виде фрагментов.
- `contexts.ts` - React Contexts. Чаще всего не нужны, достаточно Apollo GraphQL.

## State management

До августа 2019: как попало (MobX в Evenman, React Context в некоторых других приложениях).

Август-декабрь 2019: [Redux](./redux.md). Оказался слишком трудоёмким.

С декабря 2019: GraphQL (с помощью [Apollo](https://www.apollographql.com/)).

## Недостатки фронтенда

### Отсутствие тестов

Надо научиться их писать.
