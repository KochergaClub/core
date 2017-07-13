import json
import os
from functools import wraps

from flask import Flask, render_template, request
from flask_cors import CORS

import kocherga.events

DEV = bool(os.environ.get('DEV', 0))

app = Flask(__name__)
CORS(app)

trivial_ok = json.dumps({'result': 'ok'})

# from http://flask.pocoo.org/snippets/8/
def requires_auth(f):
    def check_auth(auth_header):
        if not auth_header:
            return False
        return auth_header == 'token 146a02cbd402ef89647ed1ea456be85e'

    def authenticate():
        return 'auth is required', 400

    @wraps(f)
    def decorated(*args, **kwargs):
        if not DEV and not check_auth(request.headers.get('Authorization', '')):
            return authenticate()
        return f(*args, **kwargs)
    return decorated


@app.route('/events')
@requires_auth
def events():
    events = kocherga.events.all_future_events()
    return json.dumps(events)


@app.route('/event/<event_id>/property/<key>', methods=['POST'])
@requires_auth
def set_property(event_id, key):
    value = request.get_json()['value']
    kocherga.events.set_property(event_id, key, value)
    return trivial_ok, 200

@app.route('/event/<event_id>/post/timepad', methods=['POST'])
@requires_auth
def post_timepad(event_id):
    kocherga.events.post_to_timepad(event_id)
    return trivial_ok, 200

@app.route('/event/<event_id>/check/timepad', methods=['POST'])
@requires_auth
def check_timepad(event_id):
    outcome = kocherga.events.check_timepad(event_id)
    return 'ok: {}'.format(outcome), 200


if __name__ == '__main__':
    if DEV:
        app.debug = True
    app.run()
