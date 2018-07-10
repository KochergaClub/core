import logging
logger = logging.getLogger(__name__)

import sys
from quart import Blueprint, jsonify, request, send_file
from datetime import datetime
import requests
from werkzeug.contrib.iterio import IterIO

from kocherga.error import PublicError
from kocherga.db import Session

import kocherga.events.db
from kocherga.events.event import Event

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
    event.set_field_by_prop(key, value)
    Session().commit()
    return jsonify(ok)


@bp.route("/event/<event_id>", methods=["PATCH"])
@auth("kocherga")
async def r_patch_event(event_id):
    payload = await request.get_json() or await request.form

    result = kocherga.events.db.patch_event(event_id, payload).to_dict()
    Session().commit()
    return jsonify(result)


@bp.route("/event/<event_id>", methods=["DELETE"])
@auth("kocherga")
async def r_delete_event(event_id):
    event = Event.by_id(event_id)
    event.delete()
    event.patch_google()
    Session().commit()
    return jsonify(ok)


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
def r_event_image(event_id, image_type):
    return send_file(Event.by_id(event_id).image_file(image_type))
