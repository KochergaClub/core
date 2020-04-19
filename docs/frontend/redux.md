# Redux (устарело)

## Почему Redux?

### Прошлый опыт

Я перепробовал несколько разных подходов к управлению стейтом на фронтенде:

* Evenman и booking использовали MobX
* core использовал useReducer
* Redux

В августе-декабре 2019 я пытался переписать всё на Redux. Мне не понравилось: слишком многословно и слишком много велосипедов приходится переизобретать.

Так что в декабре 2019 я сдался и перешёл на [GraphQL](./graphql.md).

### Сравнение с useReducer

`useReducer` в каждом отдельном приложении (watchmen, events) и пробрасывание dispatch в специфичном для приложения контексте было бы _почти что_ работающей и хорошей идеей.

Пока что нашлась одна причина так не делать:

* Хочется делать action creators, а не просто передавать actions (это решаемо, `dispatch(createAction())` устроен одинаково хоть в useReducer, хоть в Redux).
* Ещё хочется делать асинхронные action creators, аналогичные redux thunks (это [https://blog.solutelabs.com/configuring-thunk-action-creators-and-redux-dev-tools-with-reacts-usereducer-hook-5a1608476812](тоже решаемо)).
* Но ещё хочется предзагружать стейт на сервере, в `getInitialProps`; проблема в том, что `getInitialProps` работает вне контекста компонента, поэтому вызвать там асинхронный `dispatch(reloadSomeData())` невозможно.

С другой стороны, у прямолинейного использования redux'а есть недостатки:

* reducer общий на все приложения, и поэтому при SSR в preloadedState при наивной реализации попадут все ключи, в том числе от /team/* приложений; чтобы этого избежать, придётся подменять reducer для каждой nextjs-страницы, вероятно трекая зависимости для каждой страницы вручную
** и ещё есть вариант вместо этого хранить undefined стейт по умолчанию, писать аккуратные selector'ы и заполнять state только по мере необходимости
** не то чтобы это _совсем_ блокер, но палить названия всех внутренних приложений в коде всех страниц как-то сильно неэстетично
* redux требует большого коммитмента

## Slices

Для борьбы с копипастом используем паттерн slices из [redux-toolkit](https://redux-toolkit.js.org/api/createSlice).

Slice - объект, объединяющий actions и reducer.

Определения разных slices находятся в `redux/slices/*.ts`.

### Extended slices

Для создания slice'ов стоит использовать функцию `createExtendedSlice` из `redux/slices/utils`.

Чем она отличается: добавляет в возвращаемый объект поле `slice.selectors.self`, которое позволяет выбрать текущий slice из корневого state'а.

Чтобы это работало, имя (параметр `name` в `createExtendedSlice`) должно совпадать с путём к текущему slice'у в корневом state. За этим надо следить вручную.

Например, если вы пишете код в `my_app/features/myFeature.ts`, то:

* В `my_app/reducer.ts` в вызове `combineReducers` фича должна подключаться по полю `myFeature`.
* В корневом reducer'е `redux/reducer` в вызове `combineReducers` приложение должно подключаться по полю `my_app`.
* В поле `name` в вызове `createExtendedSlice` нужно передать `my_app/myFeature`.

Только в этом случае селектор (`export const selectMyFeature = slice.selectors.self`) будет работать корректно. Проверка типов при этом не работает, так что ошибка в полях обнаружится только в рантайме. Извините. (Кажется, это всё равно удобнее, чем писать self-селектор вручную).

### Существующие слайсы

* `value` - для хранения произвольного значения.

## Features

Фичи - это ducks-подобные файлы в директориях `APP_NAME/features/*`, отвечающие за redux-функционал какой-то части приложения.

Чтобы упростить написание фич, существуют хелперы в `redux/features/*`.

### Существующие хелперы

#### resource

Пример использования:

```
import { createResourceFeature } from '~/redux/features';

const feature = createResourceFeature({
  name: 'my_app/myFeature',
  endpoint: 'path/to/api/resource',
});

export selectItems = feature.selectors.asList;

const loadItems = feature.thunks.load;

export default feature.slice;
```
