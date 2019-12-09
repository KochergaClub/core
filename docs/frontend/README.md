# Фронтенд Кочерги

Фронтенд Кочерги написан на React, Typescript и [NextJS](https://nextjs.org/).

Отдельные интерфейсы (в частности, [форма брони](https://booking.kocherga.club) пока что живут в отдельном lerna-моно-репозитории [kocherga/core/frontend](https://gitlab.com/kocherga/code/frontend). В будущем они (все, кроме frontkit) тоже переедут в core.

## Организация файлов

Весь фронтенд-код располагается в директории `jsx`.

Если директория не указана ниже, то скорее всего это директория "приложения". По аналогии с Django-приложениями, каждое приложение отвечает за отдельный аспект сайта.

### Корневые директории

* `core/` - общие для всех страниц Redux actions, selectors, reducer.
* `redux/` - корневой redux reducer и store (использует store и другие приложения, пока что подключаются все приложения сразу, но в будущем предполагается условное подключение только тех приложений, нужных для текущей страницы).
* `components/` - общие React-компоненты.
* `common/` - общий JS-код, не специфичный для React'а или Redux'а.
* `common/hooks/` - React hooks.
* `pages/` - NextJS pages. Все файлы, кроме `_app`, `document` и `_error`, делегируют код страниц файлам в APPNAME/pages/APPNAME/pages/*.
* `wagtail/` - особое приложение с общими компонентами wagtail-блоков и страниц (но многие специфичные компоненты блоков и страниц переезжают в директории приложений)
* `render/` - серверный код для SSR и роутинга

### Организация файлов в приложении
* `api.ts` - функции-обёртки, вызывающие кочерговое API (устаревает в пользу thunks-функций в `features/`).
* `features/` - [ducks](https://github.com/erikras/ducks-modular-redux)-подобные модули Redux-функционала.
* `reducer.ts` - Redux reducer. Объединяет reducer'ы из `features/`.
* `components/` - общие React-компоненты.
* `types.ts` - TypeScript-типы для объектов из API.
* `contexts.ts` - React Contexts. Устаревает в пользу Redux.
* `pages/` - отдельные NextJS-страницы (используются из NextJS-страниц).
* `wagtail/` - Wagtail-страницы (импортируются в /pages/wagtail-any.tsx).

## State management

См. [redux](./redux.md).

## Недостатки фронтенда

### Отсутствие тестов
Пора научиться их писать.
