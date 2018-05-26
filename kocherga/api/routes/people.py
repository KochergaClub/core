from quart import Blueprint, jsonify
import kocherga.cm

bp = Blueprint("people", __name__)


@bp.route("/people/now")
def now():
    c = kocherga.cm.now_count()
    return jsonify(now=c)
