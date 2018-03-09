from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

import kocherga.secrets
import kocherga.config

from googleapiclient import discovery
import gspread

import warnings

def warn_with_traceback(message, category, filename, lineno, file=None, line=None):

    log = file if hasattr(file,'write') else sys.stderr
    traceback.print_stack(file=log)
    log.write(warnings.formatwarning(message, category, filename, lineno, line))

warnings.showwarning = warn_with_traceback

warnings.filterwarnings('ignore', '.*key_file, cert_file and check_hostname are deprecated, use a custom context instead')

GOOGLE_CREDENTIALS = kocherga.secrets.json_secret('google_credentials.json')

def credentials():
    credentials = service_account.Credentials.from_service_account_info(GOOGLE_CREDENTIALS)
    scopes = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/calendar']
    scoped_credentials = credentials.with_scopes(scopes)
    return scoped_credentials

def service(name):
    API_VERSIONS = {
        'calendar': 'v3',
    }

    if name not in API_VERSIONS:
        raise Exception('Unknown google service {}'.format(name))

    return discovery.build(
        name,
        API_VERSIONS[name],
        credentials=credentials(),
        cache_discovery=False
    )

def gspread_client(gc=None):
    if gc: return gc

    creds = credentials()

    gc = gspread.Client(auth=creds)
    gc.session = AuthorizedSession(creds)
    return gc
