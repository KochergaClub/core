import os

def get_tier():
    hostname = os.uname()[1]
    if hostname.startswith("mmcleric-osx"):
        return os.environ.get('TIER', 'dev')
    return os.environ['TIER']

TIER = get_tier()

if TIER == 'prod':
    from .prod import *
elif TIER == 'dev':
    from .dev import *
else:
    raise Exception('Unknown tier')
