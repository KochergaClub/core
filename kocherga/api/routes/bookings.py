from quart import Blueprint, jsonify, request

from datetime import datetime

from kocherga.db import Session
from kocherga.error import PublicError
import kocherga.events.booking
from kocherga.api.auth import auth, get_email
from kocherga.api.common import ok

bp = Blueprint("bookings", __name__)


@bp.route("/my/bookings")
@auth("any")
def r_list_my():
    bookings = kocherga.events.booking.bookings_by_email(get_email())
    return jsonify([b.public_object() for b in bookings])


@bp.route("/bookings/<date_str>")
def r_list_by_date(date_str):
    if date_str == "today":
        date = datetime.today().date()
    else:
        date = datetime.strptime(date_str, "%Y-%m-%d").date()

    bookings = kocherga.events.booking.day_bookings(date)
    return jsonify([b.public_object() for b in bookings])


@bp.route("/bookings", methods=["POST"])
@auth("any")
async def r_create():
    data = {"email": get_email()}
    payload = await request.get_json() or await request.form
    for field in ("date", "room", "people", "startTime", "endTime"):
        if field not in payload:
            raise PublicError("field {} is required".format(field))
        data[field] = str(payload.get(field, ""))
    kocherga.events.booking.add_booking(**data)
    Session().commit()

    return jsonify(ok)


@bp.route("/bookings/<event_id>", methods=["DELETE"])
@auth("any")
def r_delete(event_id):
    email = get_email()
    kocherga.events.booking.delete_booking(event_id, email)
    Session().commit()

    return jsonify(ok)
