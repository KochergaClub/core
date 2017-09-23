import httplib2
import os

from kocherga.common import project_dir, credentials_dir

from apiclient import discovery
import oauth2client
from oauth2client import client
from oauth2client import tools

# If modifying these scopes, delete your previously saved credentials
# at ~/.credentials/google_store.json
SCOPES = 'https://www.googleapis.com/auth/calendar'
APPLICATION_NAME = 'Kocherga Club admin app'


def secret_file():
    return os.path.join(project_dir(), 'google_api_secret.json')


def credentials_file():
    return os.path.join(credentials_dir(), 'google_store.json')


def credentials_store():
    return oauth2client.file.Storage(credentials_file())


def update_credentials(flags):
    store = credentials_store()
    flow = client.flow_from_clientsecrets(secret_file(), SCOPES)
    flow.user_agent = APPLICATION_NAME
    credentials = tools.run_flow(flow, store, flags)
    return credentials


def get_credentials():
    credentials = credentials_store().get()
    if not credentials or credentials.invalid:
        raise Exception("We don't have any valid credentials!")

    return credentials


def get_service():
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    return discovery.build('calendar', 'v3', http=http)
