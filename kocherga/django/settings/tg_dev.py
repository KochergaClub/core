import os

from .dbonly import *
from .dev_secrets import *

INSTALLED_APPS += [
    "kocherga.mastermind_bot"
]

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
