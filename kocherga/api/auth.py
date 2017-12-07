import os, sys
from functools import wraps
import datetime
import jwt

from flask import request

import requests

import kocherga.api.common
from kocherga.error import PublicError

import kocherga.team

JWT_SECRET_KEY=os.environ['JWT_SECRET_KEY']

# FIXME Potential security issue - any email can be checked for team membership.
def check_email_for_team(email, team):
    if team == 'any':
        return True
    elif team == 'kocherga':
        member = kocherga.team.find_member_by_email(email)
        if not member:
            raise PublicError('Should be a member of the Kocherga team', status_code=403)
        return True
    else:
        raise PublicError('Unknown team {}'.format(team))


def auth(team):
    def check_auth():
        header = request.headers.get('Authorization', '')

        if not header.startswith('JWT '):
            raise PublicError('Authentication required', status_code=401)

        decoded = jwt.decode(header[4:], key=JWT_SECRET_KEY)
        print(decoded)

        if check_email_for_team(decoded['email'], team) == True:
            return True
        raise Exception('check_email_for_team() returned an unknown value')

    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not kocherga.api.common.DEV:
                if check_auth() != True:
                    raise PublicError('Access denied', status_code=401)
            return f(*args, **kwargs)
        return decorated

    return decorator

def google_auth():
    CLIENT_ID = '462291115265-7ft6f9ssdpprl899q1v0le90lrto8th9.apps.googleusercontent.com'
    token = request.args.get('token', '') or request.json.get('token', '')
    team = request.args.get('team', '') or request.json.get('team', '')
    if not token:
        raise PublicError('token is required')

    r = requests.get(
        'https://www.googleapis.com/oauth2/v3/tokeninfo',
        params={
            'id_token': token,
        }
    )
    r.raise_for_status()
    email = r.json()['email']

    check_email_for_team(email, team)

    token = jwt.encode(
        payload={
            'email': email,
            'source': 'google',
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        },
        key=JWT_SECRET_KEY
    )
    return token.decode('utf-8')
