from quart import Blueprint, request, jsonify
from kocherga.api.common import ok

from kocherga.supplies.models import CookiePick
from kocherga.db import Session

bp = Blueprint("supplies", __name__)

@bp.route("/cookies/pick", methods=["POST"])
async def r_pick_cookie():
    payload = await request.get_json()

    pick = CookiePick(
        cookie_id=payload['cookie'],
        against_id=payload['against'],
        position=payload['position'],
        user=payload['user'],
        time=payload['time'],
    )
    Session().add(pick)
    Session().commit()

    return jsonify(ok)

@bp.route("/cookies/pick-neither", methods=["POST"])
async def r_pick_neither_cookie():
    payload = await request.get_json()

    for key in ['c1', 'c2']:
        pick = CookiePick(
            cookie_id='',
            against_id=payload[key],
            position=-1,
            user=payload['user'],
            time=payload['time'],
        )
        Session().add(pick)

    Session().commit()

    return jsonify(ok)
