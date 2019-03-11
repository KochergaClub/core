"""
Django settings for kocherga project.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
from pathlib import Path

BASE_DIR = str(Path(__file__).parent.parent.parent.parent)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'kocherga.auth',
    'kocherga.zadarma',
    'kocherga.importer',
    'kocherga.fb',
    'kocherga.cm',
    'kocherga.supplies',
    'kocherga.watchmen',
    'kocherga.money.ofd',
    'kocherga.money.tochka',
    'kocherga.money.cashier',
    'kocherga.analytics.timeclub24',
    'kocherga.gitlab',
    'kocherga.events',
    'kocherga.staff',
    'kocherga.api',
    'kocherga.watchmen_routine',
    'kocherga.ratio',
    'kocherga.my',
    'kocherga.timepad',
    'kocherga.mastermind_dating',
]

IGNORE_WEB = False

MIDDLEWARE = [
    'kocherga.django.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'kocherga.django.middleware.JsonExceptionMiddleware',
]

ROOT_URLCONF = 'kocherga.django.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
    {
        'BACKEND': 'django.template.backends.jinja2.Jinja2',
        'DIRS': [
            os.path.join(BASE_DIR, 'jinja_templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'environment': 'kocherga.django.jinja2.environment',
        },
    },
]

WSGI_APPLICATION = 'kocherga.django.wsgi.application'

LOGIN_URL = '/login'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'kocherga_django',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
        'PORT': '',
    }
}

CONN_MAX_AGE = 3600

# Auth

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'kocherga_auth.User'

# Email via Amazon SES

DEFAULT_FROM_EMAIL = 'info@kocherga-club.ru'
SERVER_EMAIL = 'django@kocherga-club.ru'

EMAIL_HOST = 'email-smtp.us-east-1.amazonaws.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    )
}

# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Europe/Moscow'
USE_TZ = True

USE_I18N = True
USE_L10N = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]
STATIC_ROOT = os.path.join(BASE_DIR, 'collected_static')

MEDIA_ROOT = '/data/kocherga/upload'
MEDIA_URL = '/media/'

###### Kocherga settings ######

KOCHERGA_WEBSITE = 'https://kocherga-club.ru'

KOCHERGA_TARIFF = "2,5 руб./минута"

# TODO - move to DB (implement kocherga.rooms.models)
KOCHERGA_ROOMS = [
    {
        "name": "лекционная",
        "max_people": 40,
        "area": 50
    },
    {
        "name": "гэб",
        "max_people": 20,
        "area": 30
    },
    {
        "name": "летняя",
        "max_people": 5,
        "area": 9
    },
    {
        "name": "китайская",
        "max_people": 12,
        "area": 17
    },
]

KOCHERGA_WATCHMEN_MODERN_SHIFTS_FIRST_DATE = '2016-03-14'

KOCHERGA_LUDWIG_PORT = 5200
KOCHERGA_LUDWIG_SENTRY_DSN = None
