from quart import Blueprint, jsonify

from kocherga.api.common import ok
import kocherga.api.auth

bp = Blueprint('auth', __name__)

@bp.route('/auth/google', methods=['POST'])
async def google():
    token = await kocherga.api.auth.google_auth()
    return jsonify({
        'jwt_token': token,
    })


@bp.route('/auth/check')
@kocherga.api.auth.auth('any')
def check():
    return jsonify(ok)
