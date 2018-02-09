`api.kocherga.club` - HTTP API for all kocherga-related things.

# Modules

* kocherga.api.app - the main Flask app
* kocherga.api.routes.* - Flask blueprints
* kocherga.api.common - some common vars and functions
* kocherga.api.auth - auth decorators for routes

# Как начать разработку

1. Скачать код kocherga-api.
2. Получить у кого-нибудь архив с тестовыми конфигами, распаковать конфиги куда-нибудь неважно куда (можно вне репозитория).
3. Открыть config.json, поправить в нём переменные `image_storage_dir` и `kocherga_db_file`.
4. Завести virtualenv (`python3 -mvenv venv`), активировать (`. ./venv/bin/activate`), поставить `requirements.txt` через `pip install -r ./requirements.txt`.
5. Путь к конфигам можно передать через `CONFIG_DIR` (логика выбора пути к конфигам находится в `kocherga.config`).
6. Попробовать запустить pytest, убедиться, что тесты проходятся.
