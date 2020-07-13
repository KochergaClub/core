# Бекенд Кочерги

Бекенд Кочерги написан на [Django](http://djangoproject.com/) и [Wagtail](https://wagtail.io/).

Бекенд отвечает только за API (GraphQL и немного REST), статику и Django/Wagtail-админки. То есть, HTML с помощью Django-шаблонов мы не используем никогда. (Иногда используем Jinja2-шаблоны для вспомогательных тасков: генерации писем и сообщений для Telegram-бота).

## Компоненты

Список django-приложений можно посмотреть в `kocherga.django.settings.base`.

Общие и вспомогательные модули:

- kocherga.django
- kocherga.dateutils
- kocherga.error

Прочее (постепенно будет переезжать в будущий kocherga.core.\* или рефакториться в django-приложения):

- gdrive
- google
- ludwig
- mailchimp
- room
- security
- setup
- vk
- wiki
- yandex

## База данных

За хранение большинства данных отвечает локальная MySQL-база.

Некоторые данные (STATIC и MEDIA) хранятся на S3.

## importer

Код в `kocherga.importer.*`.

Импортеры наполняют локальную базу данными из различных источников (ОФД, телефония, гуглокалендарь и т.д.)

Работает в виде демона (см. `kocherga.importer.daemon`). Отдельные импорты можно запускать через скрипт `scripts/importer.py`.

## API

Устаревший REST API на основе Django REST Framework. Код в `kocherga.api.*` и раскидан по отдельным Django-приложениям.

GraphLQL API реализован с помощью [Ariadne](https://ariadnegraphql.org/), но в будущем будет реализовано поверх низкоуровневого graphql-core.

## Типизация

Понемногу начинаем пользоваться [аннотациями типов](https://www.python.org/dev/peps/pep-0484/) и [mypy](http://mypy-lang.org/).

Чтобы проверить типы на корректность, вызовите `make test-types`. Пока что эта проверка падает с большим количеством ошибок.
