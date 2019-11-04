# Тесты

Для тестов используем [pytest](https://pytest.org) и [pytest-django](https://pytest-django.readthedocs.io), а не [unittest](https://docs.djangoproject.com/en/2.2/topics/testing/). (Довольно легко нагуглить объяснения, чем pytest удобнее).

## Как запускать

Поскольку тесты надо запускать внутри docker-контейнера, то удобно пользоваться скриптом `test.sh`, который запускает `pytest` внутри работающего конейтнера.

`test.sh` принимает все те же параметры, что и `pytest`. (Поскольку `test.sh` принимает параметры, то его нельзя сделать таргетом для `make`, к сожалению).

## Производительность

Тесты работают существенно быстрее, если передавать параметр [--reuse-db](https://pytest-django.readthedocs.io/en/latest/database.html#reuse-db-reuse-the-testing-database-between-test-runs).

## Внешние зависимости тестов

Некоторые тесты зависят от внешних сервисов (создают посты в vk, рассылки в mailchimp или события в google calendar). Эти события отмечены кастомными [pytest-маркерами](http://doc.pytest.org/en/latest/example/markers.html).

Список маркеров можно увидеть в `pytest.ini`.

Маркеры можно отключить с помощью pytest-флага `-m`. Например: `./test.sh -m 'not google and not mailchimp'`. Частичное отключение маркеров используется в том числе при запуске тестов в GitLab CI (см. файл `.gitlab-ci.yml`).

## Fixtures

Для многих тестов нужны тестовые данные в базе. Для этого используем [fixtures](http://doc.pytest.org/en/latest/fixture.html). (Если вам это непонятно, почитайте документацию; понимание fixtures необходимо для нормального использования pytest).

До ноября 2019 fixtures писались как попало. Теперь постепенно переходим на использование [Factory Boy](https://factoryboy.readthedocs.io).
