import logging

logger = logging.getLogger(__name__)

import sys
from quart import Blueprint, jsonify, request, send_file
from datetime import datetime, timedelta
import requests
from werkzeug.contrib.iterio import IterIO

from kocherga.datetime import dts
from kocherga.error import PublicError
from kocherga.db import Session
from kocherga.images import image_storage

import kocherga.events.db
from kocherga.events.event import Event
from kocherga.events.prototype import EventPrototype
import kocherga.events.announce

from kocherga.api.common import ok
from kocherga.api.auth import auth

bp = Blueprint("events", __name__)


@bp.route("/events")
@auth("kocherga")
def r_events():

    def arg2date(arg):
        d = request.args.get(arg)
        if d:
            d = datetime.strptime(d, "%Y-%m-%d").date()
        return d

    logger.debug(
        dict(
            date=request.args.get("date"),
            from_date=arg2date("from_date"),
            to_date=arg2date("to_date"),
        )
    )
    events = kocherga.events.db.list_events(
        date=request.args.get("date"),
        from_date=arg2date("from_date"),
        to_date=arg2date("to_date"),
    )
    return jsonify([e.to_dict() for e in events])


@bp.route("/event/<event_id>")
@auth("kocherga")
def r_event(event_id):
    event = Event.by_id(event_id)
    return jsonify(event.to_dict())


@bp.route("/event/<event_id>/property/<key>", methods=["POST"])
@auth("kocherga")
async def r_set_property(event_id, key):
    value = (await request.get_json())["value"]
    event = Event.by_id(event_id)
    event.set_prop(key, value)
    Session().commit()
    return jsonify(ok)


@bp.route("/event/<event_id>", methods=["PATCH"])
@auth("kocherga")
async def r_patch_event(event_id):
    payload = await request.get_json() or await request.form

    result = kocherga.events.db.patch_event(event_id, payload).to_dict()
    Session().commit()
    return jsonify(result)


@bp.route("/event/<event_id>/image/<image_type>", methods=["POST"])
@auth("kocherga")
async def r_upload_event_image(event_id, image_type):
    files = await request.files
    if "file" not in files:
        raise PublicError("Expected a file")
    file = files["file"]

    if file.filename == "":
        raise PublicError("No filename")

    event = Event.by_id(event_id)
    event.add_image(image_type, file.stream)
    Session().commit()

    return jsonify(ok)


@bp.route("/event/<event_id>/image_from_url/<image_type>", methods=["POST"])
@auth("kocherga")
async def r_set_event_image_from_url(event_id, image_type):
    payload = await request.get_json() or await request.form

    url = payload["url"]
    r = requests.get(url, stream=True)

    event = Event.by_id(event_id)
    event.add_image(image_type, IterIO(r.raw.stream(4096, decode_content=True)))
    Session().commit()

    return jsonify(ok)


@bp.route("/event/<event_id>/image/<image_type>", methods=["GET"])
def event_image(event_id, image_type):
    return send_file(Event.by_id(event_id).image_file(image_type))


# No auth - images are requested directly
# TODO - accept a token via CGI params? hmm...
@bp.route("/schedule/weekly-image", methods=["GET"])
def r_schedule_weekly_image():
    dt = datetime.today()
    if dt.weekday() < 2:
        dt = dt - timedelta(days=dt.weekday())
    else:
        dt = dt + timedelta(days=7 - dt.weekday())

    try:
        filename = image_storage.schedule_file(dt)
    except:
        error = str(sys.exc_info())
        raise PublicError(error)

    return send_file(filename)


@bp.route("/event_prototypes", methods=["GET"])
@auth("kocherga")
def r_prototypes():
    prototypes = Session().query(EventPrototype).all()
    return jsonify([
        p.to_dict(detailed=True)
        for p in prototypes
    ])


@bp.route("/event_prototypes", methods=["POST"])
@auth("kocherga")
async def r_prototype_new():
    payload = await request.get_json()

    required_fields = ("title", "weekday", "hour", "minute", "length")
    optional_fields = ("vk_group", "fb_group", "summary", "description")

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


@bp.route("/event_prototypes/<prototype_id>/instances", methods=["GET"])
@auth("kocherga")
def r_prototype_instances(prototype_id):
    prototype = Session().query(EventPrototype).get(prototype_id)
    events = prototype.instances()
    return jsonify([e.to_dict() for e in events])


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


@bp.route("/screenshot/error", methods=["GET"])
def r_last_screenshot():
    filename = image_storage.screenshot_file("error")
    return send_file(filename)
