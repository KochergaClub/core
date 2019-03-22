Этот репозиторий включает в себя основной код бекенда Кочерги. В том числе HTTP API.

Весь код на Python.

# Организация разработки

## Как начать

1. Скачать код этого репозитория.
2. Получить у кого-нибудь архив с тестовым конфигом секретов, положить в `kocherga.django.settings.dev_secrets.py`.
4. Установить docker и docker-compose.
5. Активировать среду разработки с помощью `make dev`.
6. Запустить `make test`, убедиться, что тесты проходятся.

## Как начать быстрее
Если нужно просто дописать модель или две и устраивает 

1. `cp kocherga/django/settings/dbonly.py kocherga/django/settings/new_config.py`
2. `DOCKER_SETTINGS_MODULE=kocherga.django.settings.new_config ./manage.py migrate`

## Выкладка изменений

Деплой организован с помощью Ansible, конфиги в [отдельном репозитории](https://gitlab.com/kocherga/code/deploy) (роль kocherga-core).

Постепенно настраиваем GitLab CI.

## Типизация

Понемногу начинаем пользоваться [аннотациями типов](https://www.python.org/dev/peps/pep-0484/) и [mypy](http://mypy-lang.org/).

Чтобы проверить типы на корректность, вызовите `make test-types`. Пока что эта проверка падает с большим количеством ошибок.

## Тесты

Тесты есть не на всё, но на многое. Тесты используют [pytest](https://docs.pytest.org/en/latest/).

Чтобы запустить отдельные тесты, вызовите `pytest test/test_FILENAME.py`.

# Компоненты

Django apps:
* api
* cm
* events
* gitlab
* importer
* money.*
* supplies
* watchmen
* zadarma

Общие и вспомогательные модули:
* django
* config.py
* datetime.py
* error.py
* secrets.py

Прочее (постепенно будет переезжать в common/ или рефакториться в django-приложения):
* analytics
* email
* gdrive.py
* google.py
* images.py
* ludwig
* mailchimp.py
* ratio
* room.py
* security.py
* setup
* slack.py
* team.py
* telegram
* templater
* vk
* wiki.py
* yandex

## api

REST API. Код в `kocherga.api.*`. Django-приложение для урлов в `/api`.

Код использует Django REST Framework, но написан довольно неоптимально (избыточно), потому что кое-как портирован со старого Flask-приложения.

## importer

Код в `kocherga.importer.*`.

Наполняет локальную базу данными из различных источников (ОФД, телефония, гуглокалендарь и т.д.)

Работает в виде демона (см. `kocherga.importer.daemon`). Отдельные импорты можно запускать через скрипт `scripts/importer.py`.

## База данных

За хранение большинства данных отвечает локальная MySQL-база.
