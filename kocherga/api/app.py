import logging
import os

from flask import Flask, render_template, request, jsonify, send_file

from flask_cors import CORS

import kocherga.events
import kocherga.events.booking
from kocherga.error import PublicError
from datetime import datetime, timedelta

import kocherga.api.routes.auth
import kocherga.api.routes.events
import kocherga.api.routes.rooms
import kocherga.api.routes.sensors
import kocherga.api.routes.bookings
import kocherga.api.common

def create_app(DEV):
    app = Flask(__name__)
    if DEV:
        app.debug = True
        app.logger.setLevel(logging.DEBUG)
        kocherga.api.common.DEV = True
    else:
        app.logger.setLevel(logging.INFO)
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

    for route_name in ('auth', 'events', 'rooms', 'sensors', 'bookings'):
        route = getattr(kocherga.api.routes, route_name)
        app.register_blueprint(route.bp)

    return app

DEV = bool(os.environ.get('DEV', 0))
app = create_app(DEV)
