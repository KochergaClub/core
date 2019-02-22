import os

from .base import *

SECRET_KEY = "Secrets? What secrets?"
IGNORE_WEB = True
INSTALLED_APPS = [
    'kocherga.auth',
    'django.contrib.auth',
    'django.contrib.contenttypes',
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
