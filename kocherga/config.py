import os
from pathlib import Path
import datetime
import json

import logging
logging.basicConfig(level=logging.INFO)

TZ = datetime.timezone(datetime.timedelta(hours=3))

def is_dev():
    hostname = os.uname()[1]
    if hostname.startswith('mmcleric-osx'):
        return True
    return False

def config_dir():
    override = os.environ.get('CONFIG_DIR')
    if override: return Path(override)

    tier = os.environ.get('TIER', 'prod')

    if is_dev():
        if tier == 'dev':
            return Path('/Users/berekuk/coding/kocherga/config-dev')
        elif tier == 'prod':
            return Path('/Users/berekuk/coding/kocherga/config')
        else:
            raise Exception('Unknown tier {}'.format(tier))
    else:
        if tier == 'prod':
            return Path('/data/kocherga/config')
        else:
            raise Exception('Unknown tier {}'.format(tier))

def main_config_file():
    return Path(config_dir()) / 'config.json'

CONFIG = None
def config():
    global CONFIG
    if not CONFIG:
        CONFIG = json.load(open(main_config_file()))

    return CONFIG

# A directory with credentials for backend services.
#
# TODO: Backend services should have as little permissions as necessary.
# Whenever possible, powerful secrets should be limited and scoped in the minimal portions of our code.
# (E.g., don't share a google spreadsheet with all passwords with Ludwig. Create separate service accounts for each service.)
def secrets_dir():
    return Path(config_dir()) / 'secrets'

def web_root():
    return config()['web_root']

def image_storage_dir():
    return config()['image_storage_dir']

def google_calendar_id():
    return config()['google_calendar_id']
