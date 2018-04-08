import logging
logger = logging.getLogger(__name__)

import os
from pathlib import Path

from sqlalchemy.orm import sessionmaker, scoped_session

from quart import Quart, jsonify, request, current_app, _app_ctx_stack
import quart.flask_patch # for __ident_func__

#from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from raven.contrib.flask import Sentry

import kocherga.db

from kocherga.error import PublicError

import kocherga.api.routes.auth
import kocherga.api.routes.events
import kocherga.api.routes.rooms
import kocherga.api.routes.sensors
import kocherga.api.routes.bookings
import kocherga.api.routes.people
import kocherga.api.routes.templater
import kocherga.api.routes.announcements
import kocherga.api.common

def create_app(DEV):
    app = Quart(
        __name__,
        root_path=str(Path(__file__).parent.parent.parent.resolve())
    )

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = kocherga.db.DB_URL
    kocherga.db.Session.replace(SQLAlchemy(app).session)

    sentry_dsn = kocherga.config.config().get('sentry', {}).get('api', None)
    if sentry_dsn:
        sentry = Sentry(app, dsn=sentry_dsn)

    if DEV:
        app.debug = True
        app.logger.setLevel(logging.DEBUG)
        kocherga.api.common.DEV = True
    else:
        app.logger.setLevel(logging.INFO)
    app.config['JSON_AS_ASCII'] = False
    app.config['JSONIFY_MIMETYPE'] = 'application/json; charset=utf-8'
    #CORS(app)

    ################## COMMON ########################

    # via https://github.com/pallets/flask/blob/master/docs/patterns/apierrors.rst
    @app.errorhandler(Exception)
    def handle_invalid_usage(error):
        if isinstance(error, PublicError):
            response = jsonify(error.to_dict())
            response.status_code = error.status_code
        else:
            logger.error(f'URL: {request.path}, method: {request.method}, error: {str(error)}')
            response = jsonify({'error': 'Internal error'})
            response.status_code = 500
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    for route_name in ('auth', 'events', 'rooms', 'sensors', 'bookings', 'people', 'templater', 'announcements'):
        route = getattr(kocherga.api.routes, route_name)
        app.register_blueprint(route.bp)

    @app.after_request
    async def after_request(response):
        if request.method == 'OPTIONS':
            response = await current_app.make_default_options_response()
            response.headers['Access-Control-Allow-Methods'] = 'DELETE, GET, POST, PUT, PATCH'
            headers = request.headers.get('Access-Control-Request-Headers')
            if headers:
                response.headers['Access-Control-Allow-Headers'] = headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    return app

DEV = bool(os.environ.get('DEV', 0))
app = create_app(DEV)
