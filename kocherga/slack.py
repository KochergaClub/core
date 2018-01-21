from slackclient import SlackClient
import os.path

import kocherga.secrets

def token():
    return kocherga.secrets.plain_secret('slack_workplace_token')

def classic_token():
    return kocherga.secrets.plain_secret('slack_bot_token')

def verification_token():
    return kocherga.secrets.plain_secret('slack_verification_token')

# workplace client
def client():
    return SlackClient(token())

# classic bot client - for methods which are not ported to Slack's workplace tokens yet
def classic_client():
    return SlackClient(classic_token())

def users(sc=None):
    if sc is None:
        sc = classic_client()

    response = sc.api_call('users.list')

    if not response['ok']:
        raise Exception("Couldn't load the list of users")

    return response['members']

def users_by_id(sc=None):
    _users = users(sc)
    result = {}
    for user in _users:
        result[user['id']] = user

    return result

def users_by_email(sc=None):
    _users = users(sc)
    result = {}
    for user in _users:
        email = user.get('profile', {}).get('email', None)
        if not email:
            continue
        result[email.lower()] = user

    return result
