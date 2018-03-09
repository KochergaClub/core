import logging
import os
from pathlib import Path

from quart import Quart, jsonify, request, current_app

#from flask_cors import CORS

from kocherga.error import PublicError

import kocherga.api.routes.auth
import kocherga.api.routes.events
import kocherga.api.routes.rooms
import kocherga.api.routes.sensors
import kocherga.api.routes.bookings
import kocherga.api.routes.people
import kocherga.api.routes.templater
import kocherga.api.common

def create_app(DEV):
    app = Quart(
        __name__,
        root_path=str(Path(__file__).parent.parent.parent.resolve())
    )
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
    @app.errorhandler(PublicError)
    def handle_invalid_usage(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    for route_name in ('auth', 'events', 'rooms', 'sensors', 'bookings', 'people', 'templater'):
        route = getattr(kocherga.api.routes, route_name)
        app.register_blueprint(route.bp)

    @app.after_request
    async def after_request(response):
        if request.method == 'OPTIONS':
            response = await current_app.make_default_options_response()
            response.headers['Access-Control-Allow-Methods'] = 'DELETE, GET, POST, PUT'
            headers = request.headers.get('Access-Control-Request-Headers')
            if headers:
                response.headers['Access-Control-Allow-Headers'] = headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    return app

DEV = bool(os.environ.get('DEV', 0))
app = create_app(DEV)
