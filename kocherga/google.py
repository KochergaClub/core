import warnings
warnings.filterwarnings('ignore', '.*key_file, cert_file and check_hostname are deprecated, use a custom context instead', DeprecationWarning)

from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

import kocherga.secrets
import kocherga.config

from googleapiclient import discovery
import gspread

GOOGLE_CREDENTIALS = kocherga.secrets.json_secret('google_credentials.json')

def credentials(name):
    creds = service_account.Credentials.from_service_account_info(GOOGLE_CREDENTIALS)
    scopes = {
        'sheets': ['https://spreadsheets.google.com/feeds'],
        'calendar': ['https://www.googleapis.com/auth/calendar'],
        'drive': ['https://www.googleapis.com/auth/drive'],
    }[name]
    scoped_creds = creds.with_scopes(scopes)
    return scoped_creds

def service(name):
    API_VERSIONS = {
        'calendar': 'v3',
        'drive': 'v3',
    }

    if name not in API_VERSIONS:
        raise Exception('Unknown google service {}'.format(name))

    return discovery.build(
        name,
        API_VERSIONS[name],
        credentials=credentials(name),
        cache_discovery=False
    )

def gspread_client(gc=None):
    if gc: return gc

    creds = credentials('sheets')

    gc = gspread.Client(auth=creds)
    gc.session = AuthorizedSession(creds)
    return gc
