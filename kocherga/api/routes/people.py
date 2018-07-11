from quart import Blueprint, jsonify
import kocherga.cm

bp = Blueprint("people", __name__)


@bp.route("/people/now")
def now():
    stats = kocherga.cm.now_stats()
    result = {
        "now": stats["total"], # deprecated
        "total": stats["total"],
        "customers": [
            {
                "first_name": c["first_name"],
                "last_name": c["last_name"],
            }
            for c in stats["customers"]
            if c["privacy_mode"] == "public"
        ]
    }
    return jsonify(result)
