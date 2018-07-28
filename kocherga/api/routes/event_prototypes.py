import logging
logger = logging.getLogger(__name__)

from datetime import datetime

from quart import Blueprint, jsonify, request

from kocherga.error import PublicError
from kocherga.db import Session
from kocherga.datetime import dts

from kocherga.events.prototype import EventPrototype

from kocherga.api.common import ok
from kocherga.api.auth import auth

bp = Blueprint("event_prototypes", __name__)


@bp.route("/event_prototypes", methods=["GET"])
@auth("kocherga")
def r_prototypes():
    prototypes = Session().query(EventPrototype).order_by(EventPrototype.weekday).all()
    return jsonify([
        p.to_dict(detailed=True)
        for p in prototypes
    ])


@bp.route("/event_prototypes", methods=["POST"])
@auth("kocherga")
async def r_prototype_new():
    payload = await request.get_json()

    required_fields = ("title", "location", "weekday", "hour", "minute", "length")
    optional_fields = ("vk_group", "fb_group", "summary", "description", "timepad_category_code", "timepad_prepaid_tickets", "timing_description_override")

    props = {}
    for field in required_fields:
        if field not in required_fields:
            raise PublicError(f"Field {field} is required")

        props[field] = payload[field]
    for field in optional_fields:
        props[field] = payload.get(field, None)

    prototype = EventPrototype(**props)

    Session().add(prototype)
    Session().commit()

    return jsonify(ok)


@bp.route("/event_prototypes/<prototype_id>", methods=["GET"])
@auth("kocherga")
def r_prototype(prototype_id):
    prototype = Session().query(EventPrototype).get(prototype_id)
    return jsonify(prototype.to_dict(detailed=True))

@bp.route("/event_prototypes/<prototype_id>", methods=["PATCH"])
@auth("kocherga")
async def r_patch_prototype(prototype_id):
    payload = await request.get_json() or await request.form

    prototype = Session().query(EventPrototype).get(prototype_id)

    for (key, value) in payload.items():
        if key in (
            "title",
            "description",
            "summary",
            "location",
            "weekday",
            "hour",
            "minute",
            "length",
            "vk_group",
            "fb_group",
            "timepad_category_code",
            "timepad_prepaid_tickets",
            "timing_description_override",
        ):
            setattr(prototype, key, value)
        else:
            raise Exception("Key {} is not allowed in patch".format(key))

    Session().commit()
    return jsonify(prototype.to_dict())


@bp.route("/event_prototypes/<prototype_id>/instances", methods=["GET"])
@auth("kocherga")
def r_prototype_instances(prototype_id):
    prototype = Session().query(EventPrototype).get(prototype_id)
    events = prototype.instances()
    return jsonify([e.to_dict() for e in events])


@bp.route("/event_prototypes/<prototype_id>/cancel_date/<date_str>", methods=["POST"])
@auth("kocherga")
def r_prototype_cancel_date(prototype_id, date_str):
    prototype = Session().query(EventPrototype).get(prototype_id)
    prototype.cancel_date(datetime.strptime(date_str, '%Y-%m-%d').date())
    Session().commit()
    return jsonify(ok)


@bp.route("/event_prototypes/<prototype_id>/suggested_dates")
@auth("kocherga")
def r_prototype_suggested_dates(prototype_id):
    prototype = Session().query(EventPrototype).get(prototype_id)
    datetimes = prototype.suggested_dates()
    return jsonify([dts(dt) for dt in datetimes])


@bp.route("/event_prototypes/<prototype_id>/new", methods=["POST"])
@auth("kocherga")
async def r_prototype_new_event(prototype_id):
    payload = await request.get_json()
    ts = payload["ts"]

    prototype = Session().query(EventPrototype).get(prototype_id)
    dt = datetime.fromtimestamp(ts)
    event = prototype.new_event(dt)
    Session().commit()
    return jsonify(event.to_dict())


@bp.route("/event_prototypes/<prototype_id>/image", methods=["POST"])
@auth("kocherga")
async def r_upload_image(prototype_id):
    files = await request.files
    if "file" not in files:
        raise PublicError("Expected a file")
    file = files["file"]

    if file.filename == "":
        raise PublicError("No filename")

    prototype = EventPrototype.by_id(prototype_id)
    prototype.add_image(file.stream)
    Session().commit()

    return jsonify(ok)
