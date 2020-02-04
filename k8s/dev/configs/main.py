from .base import *
from .secrets import *

import logging
logging.basicConfig(level=logging.INFO)

import os

DATA_DIR = '/data'

DEBUG = True

INSTALLED_APPS += ['debug_toolbar']
MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
ALLOWED_HOSTS = ['localhost', 'kassa.lt.berekuk.ru']
INTERNAL_IPS = ['127.0.0.1']

# Kocherga settings
KOCHERGA_WATCHMEN_SPREADSHEET_KEY = '1Ese_XAW2FgKG75kaUNNArAuqI6Q4xSbQmhoNfQwAqXY'

KOCHERGA_MAILCHIMP_MAIN_LIST_ID = '10b92c1fc0'
KOCHERGA_MAILCHIMP_DATACENTER = 'us18'

KOCHERGA_EVENT_MARKUP_SELF_MENTION = 'секта имени Юдковского'

KOCHERGA_MONEY_TOCHKA_API = 'https://enter.tochka.com/sandbox/v1'

KOCHERGA_TIMEPAD = {
    "organization": "kocherga-dev",
    "organization_id": 121284,
    "subscribers_list_id": 111111111,
    "location": {
        "city": "Москва",
        "address": "ул. Большая Дорогомиловская, д.5к2"
    },
    "default_access_status": "private",
}

KOCHERGA_FB = {
    "main_page": {
        "id": 1100858150117942,
        "name": "Кочерга - для разработки",
        "autoreplace": {
            "from": "секта имени Юдковского",
            "to": "имени Юдковского @секта",
        },
        "announce_page": "https://www.facebook.com/KchPage-1100858150117942",
    },
    "announcer_login": "facebook1@kocherga-club.ru",
}

KOCHERGA_WIKI = {
    "domain": "wiki-dev.team.kocherga.club",
    "bot": {
        "username": "Вячеслав Матюхин@Блюдвиг",
    }
}

KOCHERGA_VK = {
    "main_page": {
        "id": "yudkowsky_sect",
    },
    "daily_page": "yudkowsky_sect_daily",
    "client_id": 6274394,
    "callback_secret": "12345",
}

KOCHERGA_TELEGRAM = {
    "channel": "-1001317764479",
    "core_api": {
        "api_id": 12345,
        "api_hash": "00000",
    },
}

KOCHERGA_API_ROOT = 'http://localhost:5302/api'
KOCHERGA_WEBSITE = 'https://yudkowsky.cult'

GDRIVE_WATCHMEN_FOLDER = '14QJy4SLl-TY-DwyPWktNcCIple75Ppe_'

WAGTAILAPI_BASE_URL = "http://localhost:5302/api/wagtail"

TILDA_PUBLIC_KEY = 'egq8lznrfxn6ok7bjvte'

TELEGRAM_PROXY = "socks5://tor:9050"

KKM_SERVER = None
KKM_SERVER_CERT = None

if os.environ.get('S3_BUCKET'):
    DEFAULT_FILE_STORAGE = 'kocherga.django.storages.MediaStorage'
    STATICFILES_STORAGE = 'kocherga.django.storages.StaticStorage'

    AWS_STORAGE_BUCKET_NAME = os.environ['S3_BUCKET']
    AWS_S3_SIGNATURE_VERSION = 's3v4'
    AWS_S3_REGION_NAME = 'eu-central-1'

KOCHERGA_IMPORTER_DISABLED = True
