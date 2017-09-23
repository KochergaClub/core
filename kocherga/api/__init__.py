import json
import os, sys
from functools import wraps
from datetime import datetime

from flask import Flask, render_template, request, jsonify, send_from_directory, send_file

from flask_cors import CORS

import kocherga.events
from kocherga.common import PublicError, image_storage
import kocherga.common
from datetime import datetime, timedelta

ok = {'result': 'ok'}

def create_app(DEV):
    app = Flask(__name__)
    if DEV:
        app.debug = True
    app.config['JSON_AS_ASCII'] = False
    app.config['JSONIFY_MIMETYPE'] = 'application/json; charset=utf-8'
    CORS(app)

    ################## COMMON ########################

    # via https://github.com/pallets/flask/blob/master/docs/patterns/apierrors.rst
    @app.errorhandler(PublicError)
    def handle_invalid_usage(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

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

    ################## EVENTS ########################

    @app.route('/events')
    @requires_auth
    def events():
        events = kocherga.events.all_future_events()
        return jsonify(events)


    @app.route('/event/<event_id>')
    @requires_auth
    def event(event_id):
        event = kocherga.events.get_event(event_id)
        return jsonify(event)


    @app.route('/event/<event_id>/property/<key>', methods=['POST'])
    @requires_auth
    def set_property(event_id, key):
        value = request.get_json()['value']
        kocherga.events.set_property(event_id, key, value)
        return jsonify(ok)

    @app.route('/event/<event_id>/post/timepad', methods=['POST'])
    @requires_auth
    def post_timepad(event_id):
        kocherga.events.post_to_timepad(event_id)
        return jsonify(ok)

    @app.route('/event/<event_id>/check/timepad', methods=['POST'])
    @requires_auth
    def check_timepad(event_id):
        outcome = kocherga.events.check_timepad(event_id)
        return 'ok: {}'.format(outcome), 200

    @app.route('/event/<event_id>/image/<image_type>', methods=['POST'])
    @requires_auth
    def upload_event_image(event_id, image_type):
        print('uploading')
        if image_type not in kocherga.events.IMAGE_TYPES:
            raise PublicError('unknown image type {}'.format(image_type))

        if not kocherga.events.get_event(event_id):
            raise PublicError('event {} not found'.format(event_id)) # actually, get_event() will raise an error, so we'll never get to this point anyway

        if 'file' not in request.files:
            raise PublicError('Expected a file')
        file = request.files['file']

        if file.filename == '':
            raise PublicError('No filename')

        filename = image_storage.event_image_file(event_id, image_type)
        print('filename: ' + filename)
        file.save(filename)

        kocherga.events.set_property(
            event_id,
            kocherga.events.image_flag_property(image_type),
            'true'
        )

        return jsonify(ok)

    @app.route('/event/<event_id>/image/<image_type>', methods=['GET'])
    def event_image(event_id, image_type):
        if image_type not in kocherga.events.IMAGE_TYPES:
            raise PublicError('unknown image type {}'.format(image_type))

        return send_file( image_storage.event_image_file(event_id, image_type))

    @app.route('/schedule/weekly-image', methods=['GET'])
    def schedule_weekly_image():
        dt = datetime.today()
        if dt.weekday() < 2:
            dt = dt - timedelta(days = dt.weekday())
        else:
            dt = dt + timedelta(days = 7 - dt.weekday())

        try:
            filename = image_storage.schedule_file(dt)
        except:
            error = str(sys.exc_info())
            raise PublicError(error)

        return send_file(filename)


    ################## BOOKINGS ########################

    @app.route('/bookings/<date_str>')
    def bookings(date_str):
        if date_str == 'today':
            date = datetime.today().date()
        else:
            date = datetime.strptime(date_str, '%Y-%m-%d').date()

        bookings = kocherga.events.day_bookings(date)
        return jsonify(bookings)

    @app.route('/bookings', methods=['POST'])
    def add_booking():
        data = {}
        for field in ('date', 'room', 'people', 'startTime', 'endTime', 'contact'):
            if field not in request.form:
                raise PublicError('field {} is required'.format(field))
            data[field] = str(request.form.get(field, ''))
        kocherga.events.add_booking(**data)

        return jsonify(ok)

    return app

DEV = bool(os.environ.get('DEV', 0))
app = create_app(DEV)
