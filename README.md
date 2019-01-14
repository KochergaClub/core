Этот репозиторий включает в себя основной код бекенда Кочерги. В том числе HTTP API.

Весь код на Python.

# Организация разработки

## Как начать

1. Скачать код этого репозитория.
2. Получить у кого-нибудь архив с тестовыми конфигами, распаковать конфиги куда-нибудь неважно куда (можно вне репозитория).
3. Открыть config.json в папке с конфигами, поправить в нём переменные `image_storage_dir` и `kocherga_db_file`.
4. Установить pipenv и поставить зависимости c помощью `make install-dev`.
5. Активировать среду разработки с помощью `pipenv shell`.
6. Выбрать настройки (боевая/тестовая база и т.д.) можно через переменную среды `TIER` (логика выбора django-конфига находится в `kocherga/django/settings/__init__.py`).
7. Запустить pytest, убедиться, что тесты проходятся.

## Выкладка изменений

Деплой организован с помощью Ansible, конфиги в [отдельном репозитории](https://gitlab.com/kocherga/code/deploy) (роль kocherga-core).

## Типизация

Понемногу начинаем пользоваться [аннотациями типов](https://www.python.org/dev/peps/pep-0484/) и [mypy](http://mypy-lang.org/).

Заглушки для сторонних библиотек - в `stubs/local-stubs`. Если появятся хорошие внешние заглушки, то можно их подключать через git submodule в `stubs/*`, но с [sqlalchemy-stubs](https://github.com/JelleZijlstra/sqlalchemy-stubs) было много проблем, так что пока что ни одного прецедента этому нет.

Чтобы проверить типы на корректность, вызовите `make test-types`.

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

Пока что это портированный с Flask (точнее, Quart) код.

В будущем перепишем на Django REST Framework и разберу на отдельные приложения.

## importer

Код в `kocherga.importer.*`.

Наполняет локальную базу данными из различных источников (ОФД, телефония, гуглокалендарь и т.д.)

Работает в виде демона (см. `kocherga.importer.daemon`). Отдельные импорты можно запускать через скрипт `scripts/importer.py`.

## Прочее

### Конфиги (config и secrets)

(Устарело, конфиги теперь в Django, в `kocherga.django.settings.*`).

## База данных

За хранение большинства данных отвечает локальная MySQL-база.
