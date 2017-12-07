from flask import Blueprint, jsonify

import kocherga.api.auth

bp = Blueprint('auth', __name__)

@bp.route('/auth/google', methods=['POST'])
def google():
    token = kocherga.api.auth.google_auth()
    print(token)
    return jsonify({
        'jwt_token': token,
    })
