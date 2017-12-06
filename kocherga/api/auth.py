from functools import wraps

from flask import request

import kocherga.api.common

# common auth options for blueprint routes

# from http://flask.pocoo.org/snippets/8/
def token_auth(f):
    def check_auth(auth_header):
        if not auth_header:
            return False
        return auth_header == 'token 146a02cbd402ef89647ed1ea456be85e'

    def authenticate():
        return 'auth is required', 400

    @wraps(f)
    def decorated(*args, **kwargs):
        if not kocherga.api.common.DEV and not check_auth(request.headers.get('Authorization', '')):
            return authenticate()
        return f(*args, **kwargs)
    return decorated
