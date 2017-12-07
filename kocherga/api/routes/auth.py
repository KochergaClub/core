from flask import Blueprint, jsonify

from kocherga.api.common import ok
import kocherga.api.auth

bp = Blueprint('auth', __name__)

@bp.route('/auth/google', methods=['POST'])
def google():
    token = kocherga.api.auth.google_auth()
    print(token)
    return jsonify({
        'jwt_token': token,
    })


@bp.route('/auth/check')
@kocherga.api.auth.auth('any')
def check():
    return jsonify(ok)
