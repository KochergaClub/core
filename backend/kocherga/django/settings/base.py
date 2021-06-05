"""
Django settings for kocherga project.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
from pathlib import Path

BASE_DIR = str(Path(__file__).parent.parent.parent.parent)


# We call Django REST API from the frontend and want the API to interpret its own host correctly.
# For example, this matters when we use request.build_absolute_uri().
USE_X_FORWARDED_HOST = True

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'channels',
    'reversion',
    # 'reversion_compare', # not ready for django 3.1 yet
    'wagtail.contrib.forms',
    'wagtail.contrib.redirects',
    'wagtail.contrib.modeladmin',
    'wagtail.contrib.styleguide',
    'wagtail.embeds',
    'wagtail.users',
    'wagtail.snippets',
    'wagtail.documents',
    'wagtail.images',
    'wagtail.search',
    'wagtail.admin',
    'wagtail.core',
    'wagtail.sites',
    'wagtailmath',
    'wagtailgeowidget',
    'wagtailorderable',
    'condensedinlinepanel',
    'ariadne.contrib.django',
    'kocherga.django',
    'kocherga.wagtail',
    'kocherga.auth',
    'kocherga.zadarma',
    'kocherga.importer',
    'kocherga.fb',
    'kocherga.cm',
    'kocherga.cm2',
    'kocherga.supplies',
    'kocherga.watchmen',
    'kocherga.kkm',
    'kocherga.money.tochka',
    'kocherga.money.cashier',
    'kocherga.yandex_kassa',
    'kocherga.analytics',
    'kocherga.analytics.timeclub24',  # legacy/broken
    'kocherga.gitlab',
    'kocherga.events',
    'kocherga.staff',
    'kocherga.api',
    'kocherga.watchmen_routine',
    'kocherga.ratio',
    'kocherga.timepad',
    'kocherga.mastermind_dating',
    'kocherga.projects',
    'kocherga.pages',
    'kocherga.blog',
    'kocherga.email',
    'kocherga.slack',
    'kocherga.templater',
    'kocherga.faq',
    'kocherga.telegram',
    'kocherga.tilda',
    'kocherga.zoom',
    'kocherga.openvidu',
    'kocherga.external_services',
    'kocherga.presentations',
    'kocherga.community',
    'kocherga.comments',
    'taggit',
    'modelcluster',
    'wagtail.api.v2',
    'rest_framework',
]

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
    'reversion.middleware.RevisionMiddleware',
]

# NO_DJANGO_PROMETHEUS is used to disable prometheus for importer.py and worker.py.
if not os.environ.get('NO_DJANGO_PROMETHEUS'):
    MIDDLEWARE = (
        ['django_prometheus.middleware.PrometheusBeforeMiddleware']
        + MIDDLEWARE
        + ['django_prometheus.middleware.PrometheusAfterMiddleware']
    )
    INSTALLED_APPS = INSTALLED_APPS + ['django_prometheus']

ADD_REVERSION_ADMIN = True

ROOT_URLCONF = 'kocherga.django.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.jinja2.Jinja2',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'environment': 'kocherga.django.jinja2.environment',
            'extensions': [],
        },
    },
    # needed for admin
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
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
]

ASGI_APPLICATION = 'kocherga.django.routing.application'

REDIS_HOST = os.environ['REDIS_HOST']

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {"hosts": [(REDIS_HOST, 6379)]},
    },
}

LOGIN_URL = '/login'

DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

# Wagtail

WAGTAIL_SITE_NAME = "Kocherga"
WAGTAIL_FRONTEND_LOGIN_URL = LOGIN_URL
WAGTAIL_FRONTEND_LOGIN_TEMPLATE = 'nosuchtemplate.html'
WAGTAIL_APPEND_SLASH = False
WAGTAILAPI_LIMIT_MAX = None
WAGTAILIMAGES_IMAGE_MODEL = 'kocherga_wagtail.CustomImage'
WAGTAIL_USER_EDIT_FORM = 'kocherga.wagtail.forms.CustomUserEditForm'
WAGTAIL_USER_CREATION_FORM = 'kocherga.wagtail.forms.CustomUserCreationForm'
WAGTAILUSERS_PASSWORD_REQUIRED = False


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'kocherga',
        'USER': 'kocherga',
        'PASSWORD': os.environ['DB_PASSWORD'],
        'HOST': os.environ['DB_HOST'],
        'OPTIONS': {'charset': 'utf8mb4'},
    }
}

CONN_MAX_AGE = 3600

# Auth

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

SESSION_COOKIE_AGE = 86400 * 365

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'
    },
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

AUTH_USER_MODEL = 'kocherga_auth.User'
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'kocherga.auth.backends.TokenBackend',
]

# Email via Amazon SES

DEFAULT_FROM_EMAIL = 'info@kocherga-club.ru'
SERVER_EMAIL = 'django@kocherga-club.ru'

EMAIL_HOST = 'email-smtp.us-east-1.amazonaws.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'kocherga.api.auth.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.IsAdminUser',),
    'DEFAULT_RENDERER_CLASSES': ('rest_framework.renderers.JSONRenderer',),
    'EXCEPTION_HANDLER': 'kocherga.django.drf.exception_handler',
}

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Europe/Moscow'
USE_TZ = True

USE_I18N = True
USE_L10N = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]

# TODO
# Unused in production - we use django-storages with S3 instead.
# Unused in development - we use runserver, so STATIC_ROOT stays unused.
# Maybe this setting should be deleted altogether.
STATIC_ROOT = os.path.join(BASE_DIR, 'collected_static')

MEDIA_ROOT = '/data/upload'
MEDIA_URL = '/media/'

DATA_UPLOAD_MAX_MEMORY_SIZE = 1024 * 1024 * 10

# ------------- Kocherga settings --------------

KOCHERGA_WEBSITE = os.environ['KOCHERGA_WEBSITE']

KOCHERGA_TARIFF = "2,5 руб./минута"

# TODO - move to DB (implement kocherga.rooms.models)
KOCHERGA_ROOMS = [
    {"name": "лекционная", "max_people": 40, "area": 50},
    {"name": "гэб", "max_people": 20, "area": 30},
    {"name": "летняя", "max_people": 5, "area": 9},
    {"name": "китайская", "max_people": 12, "area": 17},
]

KOCHERGA_WATCHMEN_MODERN_SHIFTS_FIRST_DATE = '2016-03-14'

KOCHERGA_LUDWIG_SENTRY_DSN = None

GDRIVE_WATCHMEN_FOLDER = None

GOOGLE_MAPS_V3_APIKEY = 'AIzaSyDTpyJfFT0Taz2DuiTJl5ng64Dn3st02TI'

TILDA_PROJECT_ID = 14971

TELEGRAM_PROXY = ''

KOCHERGA_IMPORTER_DISABLED = False

KKM_SERVER = None
KKM_SERVER_CERT = None  # can be set to custom certificate file path
KKT_NUMBER = None

KKT_CASHIER = None
# example value:
# {
#    "name": "Элиезер Шломо Юдковский",  # Продавец, тег ОФД 1021
#    "inn": "1234567890",  # ИНН продавца тег ОФД 1203
# }
