import os

from .base import *

SECRET_KEY = "Secrets? What secrets?"
IGNORE_WEB = True
INSTALLED_APPS = [
    'kocherga.auth',
    # 'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    # 'django.contrib.sessions',
    # 'django.contrib.messages',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'data/test.db')
    }
}

MIDDLEWARE = []

try:
    os.mkdir("data")
except FileExistsError:
    pass
DATA_DIR = 'data'
DEBUG = True

INTERNAL_IPS = ['127.0.0.1']

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

KOCHERGA_TELEGRAM = {
    "channel": "-1001317764479",
    "core_api": {
        "api_id": 12345,
        "api_hash": "00000",
    },
}

KOCHERGA_API_ROOT = 'https://api.kocherga.club'
KOCHERGA_WEBSITE = 'https://yudkowsky.cult'
