import logging.config
import os
import socket

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

from .base import *
from .secrets import *

SENTRY_DSN = "https://379bb5d0da004b9fbf140914d870c555:147a473bac5641d79000d51873032874@sentry.io/1160229"
sentry_sdk.init(dsn=SENTRY_DSN, integrations=[DjangoIntegration()])

DEBUG = False

# Security

ALLOWED_HOSTS = [
    ".kocherga.club",
    ".kocherga-club.ru",
    "localhost",
    "localhost:8000",
    "localhost:5300",
    "localhost:5302",
    # via https://github.com/korfuri/django-prometheus/issues/81
    socket.gethostname(),
    socket.gethostbyname(socket.gethostname()),
]

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Logging
LOGGING_CONFIG = None
logging.config.dictConfig(
    {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "console": {
                "format": "[%(asctime)s] %(levelname)-8s %(name)-15s %(message)s",
            },
        },
        "handlers": {
            "console": {"class": "logging.StreamHandler", "formatter": "console"},
        },
        "loggers": {"": {"level": "INFO", "handlers": ["console"]}},
    }
)

# Kocherga settings
KOCHERGA_WATCHMEN_SPREADSHEET_KEY = "1hOdxVC3d7O9gziOLNLz2OPV_lkw0hf0_6jA5L7FA844"

KOCHERGA_MAILCHIMP_MAIN_LIST_ID = "d73cd4de36"
KOCHERGA_MAILCHIMP_DATACENTER = "us11"

KOCHERGA_EVENT_MARKUP_SELF_MENTION = "антикафе Кочерга"

KOCHERGA_MONEY_TOCHKA_API = "https://enter.tochka.com/api/v1"

KOCHERGA_TIMEPAD = {
    "organization": "kocherga",
    "organization_id": 53244,
    "subscribers_list_id": 92482,
    "location": {"city": "Москва", "address": "ул. Большая Дорогомиловская, д.5к2"},
    "default_access_status": "public",
}

KOCHERGA_FB = {
    "main_page": {
        "id": 1083453805000382,
        "name": "Кочерга",
        "autoreplace": {"from": "антикафе Кочерга", "to": "антикафе @Кочерга"},
        "announce_page": "https://www.facebook.com/pg/kocherga.club",
        "slug": "kocherga.club",
    },
    "announcer_login": "mmcleric@gmail.com",
}

KOCHERGA_WIKI = {
    "domain": "wiki.team.kocherga.club",
    "bot": {"username": "Вячеслав Матюхин@Людвиг"},
}

KOCHERGA_VK = {
    "main_page": {
        "id": "kocherga_club",
        "main_wall_page_id": 50473877,
    },
    "daily_page": "kocherga_daily",
    "client_id": 6274394,
    "callback_secret": KOCHERGA_VK_CALLBACK_SECRET,
}

KOCHERGA_TELEGRAM = {
    "channel": "@kocherga_club",
    "core_api": {
        "api_id": 434030,
        "api_hash": "c13cbcfc179d34db2b2c862d2693606f",
    },
}

KOCHERGA_BACKUPS_S3_BUCKET = "kocherga-backups"

# TODO - move to sentry_sdk?
KOCHERGA_LUDWIG_SENTRY_DSN = "https://d6daa44a06a846a98743000040168090:7b1fad4c93454acd90fe9f973934ba90@sentry.io/1161227"

KOCHERGA_WEBSITE = "https://kocherga-club.ru"
KOCHERGA_API_ROOT = f"{KOCHERGA_WEBSITE}/api"

KOCHERGA_YANDEX_ORG_ID = 649407

GDRIVE_WATCHMEN_FOLDER = "0B3eXnAACJCqlOUlEWUU2bkRlMkE"

WAGTAILAPI_BASE_URL = f"{KOCHERGA_API_ROOT}/wagtail"
WAGTAILSEARCH_BACKENDS = {
    "default": {
        "BACKEND": "wagtail.search.backends.elasticsearch7",
        "URLS": ["http://elasticsearch-master-headless:9200"],
        "INDEX": "wagtail",
        "TIMEOUT": 5,
        "OPTIONS": {},
        "INDEX_SETTINGS": {},
    }
}

# this is wagtail setting for email templates, see https://github.com/wagtail/wagtail/pull/3769 for details
BASE_URL = KOCHERGA_WEBSITE

TILDA_PUBLIC_KEY = "egq8lznrfxn6ok7bjvte"

KKM_SERVER = "https://kkm.kocherga.club"
# unused - we use nginx+letsencrypt with strong passwords instead
# KKM_SERVER_CERT = "/KKMServer.pem"

KKT_NUMBER = "00106107239381"
KKT_CASHIER = {
    "name": "Матюхин Вячеслав Анатольевич",  # Продавец, тег ОФД 1021
    "inn": "761401504036",  # ИНН продавца тег ОФД 1203
}

if os.environ.get("STATIC_S3_BUCKET"):
    DEFAULT_FILE_STORAGE = "kocherga.django.storages.MediaStorage"
    STATICFILES_STORAGE = "kocherga.django.storages.StaticStorage"

    AWS_S3_CUSTOM_DOMAIN = os.environ.get("CDN_DOMAIN")
    AWS_STORAGE_BUCKET_NAME = os.environ["STATIC_S3_BUCKET"]
    AWS_S3_SIGNATURE_VERSION = "s3v4"
    AWS_S3_REGION_NAME = "eu-central-1"
    AWS_S3_FILE_OVERWRITE = False  # important! see https://docs.wagtail.io/en/latest/advanced_topics/deploying.html#cloud-storage

OPENVIDU_SERVER = "https://openvidu.kocherga.club"
