from .base import *
from .dev_secrets import *

DATA_DIR = '/Users/berekuk/coding/kocherga/data-dev'
DEBUG = True

INSTALLED_APPS += ['debug_toolbar']
MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
INTERNAL_IPS = ['127.0.0.1']

# Kocherga settings
KOCHERGA_TEAM_SPREADSHEET_KEY = '1EqIOneeV4-6qVfVEGDPYS4EAO195PwDbuS0MBvBJkB8'

KOCHERGA_WATCHMEN_SPREADSHEET_KEY = '1Ese_XAW2FgKG75kaUNNArAuqI6Q4xSbQmhoNfQwAqXY'

KOCHERGA_GOOGLE_CALENDAR_ID = "22m4r7l6gl1jn9vqokdeq9b7o4@group.calendar.google.com"

KOCHERGA_MAILCHIMP_MAIN_LIST_ID = '10b92c1fc0'
KOCHERGA_MAILCHIMP_DATACENTER = 'us18'

KOCHERGA_EVENT_MARKUP_SELF_MENTION = 'секта имени Юдковского'

KOCHERGA_MONEY_TOCHKA_API = 'https://enter.tochka.com/sandbox/v1'

KOCHERGA_MONEY_OFD_FISCAL_DRIVE_NUMBER = '8712000101056759' # same as in prod.py, OFD is read-only anyway

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
        "id": 180291859485985,
        "name": "Кочерга - для разработки",
        "autoreplace": {
            "from": "секта имени Юдковского",
            "to": "имени Юдковского @секта",
        },
        "announce_page": "https://www.facebook.com/Кочерга-для-разработки-2-180291859485985",
    },
    "announcer_login": "slava+fbtest2@kocherga-club.ru",
}

KOCHERGA_WIKI = {
    "domain": "wiki-dev.team.kocherga.club",
    "bot": {
      "username": "Вячеслав Матюхин@Блюдвиг"
    }
}

KOCHERGA_VK = {
    "main_page": {
        "id": "yudkowsky_sect",
    },
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

KOCHERGA_API_ROOT = 'https://api-dev.kocherga.club'
KOCHERGA_WEBSITE = 'https://yudkowsky.cult'
