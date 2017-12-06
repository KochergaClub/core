from flask import Blueprint, jsonify

from kocherga.api.common import ok

bp = Blueprint('sensors', __name__)

@bp.route('/sensors/<key>', methods=['POST'])
def add_sensor_value(key):
    app.logger.info('[sensor value] {}: {}'.format(key, request.data))
    return jsonify(ok)
