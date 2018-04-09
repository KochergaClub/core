import quart.flask_patch

import logging
logger = logging.getLogger(__name__)

import os
from pathlib import Path

from sqlalchemy.orm import sessionmaker, scoped_session

from quart import Quart, jsonify, request, current_app, _app_ctx_stack, render_template

#from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import kocherga.db
import raven

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

# Necessary until https://github.com/mitsuhiko/flask-sqlalchemy/pull/577 will be merged and released.
class SQLAlchemyPatched(SQLAlchemy):
    def apply_pool_defaults(self, app, options):
        super().apply_pool_defaults(app, options)
        options['pool_pre_ping'] = True


def create_app(DEV):
    app_root = (Path(__file__).parent.parent.parent / 'http_api').resolve()
    app = Quart(
        __name__,
        root_path=str(app_root),
#        static_folder=str(app_root / 'static'),
#        template_folder=str(app_root / 'api_static'),
        static_url_path='',
    )

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = kocherga.db.DB_URL
    kocherga.db.Session.replace(SQLAlchemyPatched(app).session)

    sentry_dsn = kocherga.config.config().get('sentry', {}).get('api', None)

    #Disabled until we upgrade to quart 0.5.0 with its Werkzeug wrapper API (https://gitlab.com/pgjones/quart/issues/6)
    #
    #from raven.contrib.flask import Sentry
    #if sentry_dsn:
    #    sentry = Sentry(app, dsn=sentry_dsn, wrap_wsgi=False)

    raven_client = None
    if sentry_dsn:
        raven_client = raven.Client(sentry_dsn)

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

    @app.route('/')
    async def index_route():
        return await render_template('index.html')

    # via https://github.com/pallets/flask/blob/master/docs/patterns/apierrors.rst
    @app.errorhandler(Exception)
    def handle_invalid_usage(error):
        if raven_client:
            raven_client.captureException()
        print(error)

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
