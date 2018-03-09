Этот репозиторий включает в себя основной код бекенда Кочерги. В том числе:

* API на Python
* HTTP API на Quart (асинхронный клон Flask) - тонкая обёртка над Python API.

# HTTP API

Продакшн работает на `https://api.kocherga.club`.

## Модули

* kocherga.api.app - the main Quart app
* kocherga.api.routes.* - Quart blueprints
* kocherga.api.common - some common vars and functions
* kocherga.api.auth - auth decorators for routes

# Как начать разработку

1. Скачать код kocherga-api.
2. Получить у кого-нибудь архив с тестовыми конфигами, распаковать конфиги куда-нибудь неважно куда (можно вне репозитория).
3. Открыть config.json, поправить в нём переменные `image_storage_dir` и `kocherga_db_file`.
4. Завести virtualenv (`python3 -mvenv venv`), активировать (`. ./venv/bin/activate`), поставить `requirements.txt` через `pip install -r ./requirements.txt`.
5. Путь к конфигам можно передать через `CONFIG_DIR` (логика выбора пути к конфигам находится в `kocherga.config`).
6. Попробовать запустить pytest, убедиться, что тесты проходятся.
