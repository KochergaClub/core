from .base import *
from .prod_secrets import *

import os

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

SENTRY_DSN = 'https://379bb5d0da004b9fbf140914d870c555:147a473bac5641d79000d51873032874@sentry.io/1160229'
sentry_sdk.init(
    dsn=SENTRY_DSN,
    integrations=[DjangoIntegration()]
)

DEBUG = False
DATA_DIR = os.environ.get('DATA_DIR', '/data')

# Security

# TODO - deploy these; but for now we have HTTP-only iacsv.kocherga.club
# SECURE_HSTS_SECONDS = 86400 # TODO - increase
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True

ALLOWED_HOSTS = ['kocherga.club', 'api.kocherga.club']

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Logging
import logging.config
LOGGING_CONFIG = None
logging.config.dictConfig({
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'console': {
            'format': '[%(asctime)s] %(levelname)-8s %(name)-15s %(message)s',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'console',
        },
    },
    'loggers': {
        '': {
            'level': 'INFO',
            'handlers': ['console'],
        },
    },
})

# Kocherga settings
KOCHERGA_WATCHMEN_SPREADSHEET_KEY = '1hOdxVC3d7O9gziOLNLz2OPV_lkw0hf0_6jA5L7FA844'

KOCHERGA_GOOGLE_CALENDAR_ID = 'lv3963udctvoh944c7dlik5td4@group.calendar.google.com'

KOCHERGA_MAILCHIMP_MAIN_LIST_ID = 'd73cd4de36'
KOCHERGA_MAILCHIMP_DATACENTER = 'us11'

KOCHERGA_EVENT_MARKUP_SELF_MENTION = 'антикафе Кочерга'

KOCHERGA_MONEY_TOCHKA_API = 'https://enter.tochka.com/api/v1'

KOCHERGA_TIMEPAD = {
    "organization": "kocherga",
    "organization_id": 53244,
    "subscribers_list_id": 92482,
    "location": {
        "city": "Москва",
        "address": "ул. Большая Дорогомиловская, д.5к2"
    },
    "default_access_status": "public",
}

KOCHERGA_FB = {
    "main_page": {
        "id": 1083453805000382,
        "name": "Кочерга",
        "autoreplace": {
            "from": "антикафе Кочерга",
            "to": "антикафе @Кочерга",
        },
        "announce_page": "https://www.facebook.com/pg/kocherga.club",
    },
    "announcer_login": "mmcleric@gmail.com",
}

KOCHERGA_WIKI = {
    "domain": "wiki.team.kocherga.club",
    "bot": {
        "username": "Вячеслав Матюхин@Людвиг",
    }
}

KOCHERGA_VK = {
    "main_page": {
        "id": "kocherga_club",
        "main_wall_page_id": 50473877,
    },
    "daily_page": "kocherga_daily",
    "client_id": 6274394,
    "callback_secret": "UHD9g3yQkhgb9ZjCZ1Q1qWVuDUo",  # FIXME - secret??
}

KOCHERGA_TELEGRAM = {
    "channel": "@kocherga_club",
    "core_api": {
        "api_id": 434030,
        "api_hash": "c13cbcfc179d34db2b2c862d2693606f",
    },
}

KOCHERGA_BACKUPS_S3_BUCKET = 'kocherga-backups'

# TODO - move to sentry_sdk?
KOCHERGA_LUDWIG_SENTRY_DSN = 'https://d6daa44a06a846a98743000040168090:7b1fad4c93454acd90fe9f973934ba90@sentry.io/1161227'

KOCHERGA_API_ROOT = 'https://api.kocherga.club'
KOCHERGA_WEBSITE = 'https://kocherga-club.ru'

KOCHERGA_YANDEX_ORG_ID = 649407

GOOGLE_ANALYTICS_ID = 'UA-67233667-7'

GDRIVE_WATCHMEN_FOLDER = '0B3eXnAACJCqlOUlEWUU2bkRlMkE'
