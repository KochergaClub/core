"""
Django settings for local execution in dev environment.
"""

import os

os.environ['REDIS_HOST'] = 'localhost'
os.environ['DB_PASSWORD'] = 'whatever'
os.environ['DB_HOST'] = 'whatever'

from .base import *

from .sample_secrets import *

import os

import logging

logging.basicConfig(level=logging.INFO)

DEBUG = True

ALLOWED_HOSTS = ["localhost"]
INTERNAL_IPS = ["127.0.0.1"]

DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': 'local_db',}}

# Kocherga settings
KOCHERGA_WATCHMEN_SPREADSHEET_KEY = "FAKE"

KOCHERGA_MAILCHIMP_MAIN_LIST_ID = "FAKE"
KOCHERGA_MAILCHIMP_DATACENTER = "FAKE"

KOCHERGA_EVENT_MARKUP_SELF_MENTION = "UNSET"

KOCHERGA_MONEY_TOCHKA_API = "https://enter.tochka.com/sandbox/v1"

KOCHERGA_TIMEPAD = {
    "organization": "UNSET",
    "organization_id": 11111,
    "subscribers_list_id": 11111,
    "location": {"city": "Москва", "address": "ул. Большая Дорогомиловская, д.5к2"},
    "default_access_status": "private",
}

KOCHERGA_FB = {
    "main_page": {
        "id": 11111,
        "name": "UNSET",
        "autoreplace": {"from": "UNSET", "to": "UNSET",},
        "announce_page": "https://www.facebook.com/UNSET",
    },
    "announcer_login": "unset@example.com",
}

KOCHERGA_WIKI = {
    "domain": "unset.example.com",
    "bot": {"username": "UNSET"},
}

KOCHERGA_VK = {
    "main_page": {"id": "UNSET"},
    "daily_page": "UNSET",
    "client_id": 11111,
    "callback_secret": "11111",
}

KOCHERGA_TELEGRAM = {
    "channel": "-111111",
    "core_api": {"api_id": 11111, "api_hash": "00000"},
}

KOCHERGA_API_ROOT = "http://localhost:5302/api"
KOCHERGA_WEBSITE = "https://yudkowsky.cult"

GDRIVE_WATCHMEN_FOLDER = "14QJy4SLl-TY-DwyPWktNcCIple75Ppe_"

WAGTAILAPI_BASE_URL = "http://localhost:5302/api/wagtail"
BASE_URL = KOCHERGA_WEBSITE

TILDA_PUBLIC_KEY = "egq8lznrfxn6ok7bjvte"

KKM_SERVER = None
KKM_SERVER_CERT = None

if os.environ.get("STATIC_S3_BUCKET"):
    DEFAULT_FILE_STORAGE = "kocherga.django.storages.MediaStorage"
    STATICFILES_STORAGE = "kocherga.django.storages.StaticStorage"

    AWS_STORAGE_BUCKET_NAME = os.environ["STATIC_S3_BUCKET"]
    AWS_S3_SIGNATURE_VERSION = "s3v4"
    AWS_S3_REGION_NAME = "eu-central-1"

KOCHERGA_IMPORTER_DISABLED = True

OPENVIDU_SERVER = "https://core-openvidu:30003"
OPENVIDU_SECRET = "MY_SECRET"
