import os
from pathlib import Path
import datetime
import json

import logging
logging.basicConfig(level=logging.INFO)

### pytz is kinda crazy - it returns LMT from time to time.
### It can be fixed by using tz.localize(dt) instead of passing tzinfo, and it looks more correct, but it requires a big refactoring.
###
### Also: "The preferred way of dealing with times is to always work in UTC, converting to localtime only when generating output to be read by humans."
### (from https://pypi.python.org/pypi/pytz/)
###
# import pytz
# TZ = pytz.timezone('Europe/Moscow')

from dateutil import tz
TZ = tz.tzoffset('MSK', 3600 * 3)

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

_CONFIG = None
def config():
    global _CONFIG
    if not _CONFIG:
        _CONFIG = json.load(open(main_config_file()))

    return _CONFIG

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
