import logging
logger = logging.getLogger(__name__)

import sys
from quart import Blueprint, jsonify, request, send_file
from datetime import datetime, time
import requests
from werkzeug.contrib.iterio import IterIO

from kocherga.error import PublicError
from kocherga.db import Session

import kocherga.events.db
from kocherga.events.event import Event
from kocherga.events.tag import EventTag

from kocherga.api.common import ok
from kocherga.api.auth import auth

from kocherga.config import config
from kocherga.datetime import MSK_DATE_FORMAT

from feedgen.feed import FeedGenerator

bp = Blueprint("events", __name__)


@bp.route("/events")
@auth("kocherga")
def r_list():

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
def r_get(event_id):
    event = Event.by_id(event_id)
    return jsonify(event.to_dict())


@bp.route("/event", methods=["POST"])
@auth("kocherga")
async def r_create():
    payload = await request.get_json() or await request.form
    title = payload['title']
    start_dt = datetime.strptime(payload['start'], MSK_DATE_FORMAT)
    end_dt = datetime.strptime(payload['end'], MSK_DATE_FORMAT)
    event = Event(title=title, start_dt=start_dt, end_dt=end_dt)
    kocherga.events.db.insert_event(event)
    Session().commit()
    return jsonify(event.to_dict())


@bp.route("/event/<event_id>/property/<key>", methods=["POST"])
@auth("kocherga")
async def r_set_property(event_id, key):
    value = (await request.get_json())["value"]

    event = Event.by_id(event_id)
    event.patch({ key: value })

    Session().commit()
    return jsonify(ok)


@bp.route("/event/<event_id>", methods=["PATCH"])
@auth("kocherga")
async def r_patch(event_id):
    payload = await request.get_json() or await request.form

    event = Event.by_id(event_id)
    event.patch(payload)

    Session().commit()
    return jsonify(event.to_dict())


@bp.route("/event/<event_id>", methods=["DELETE"])
@auth("kocherga")
async def r_delete(event_id):
    event = Event.by_id(event_id)
    event.delete()
    event.patch_google()
    Session().commit()
    return jsonify(ok)


@bp.route("/event/<event_id>/image/<image_type>", methods=["POST"])
@auth("kocherga")
async def r_upload_image(event_id, image_type):
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
async def r_set_image_from_url(event_id, image_type):
    payload = await request.get_json() or await request.form

    url = payload["url"]
    r = requests.get(url, stream=True)

    event = Event.by_id(event_id)
    event.add_image(image_type, IterIO(r.raw.stream(4096, decode_content=True)))
    Session().commit()

    return jsonify(ok)


@bp.route("/event/<event_id>/image/<image_type>", methods=["GET"])
def r_get_image(event_id, image_type):
    return send_file(Event.by_id(event_id).image_file(image_type))


@bp.route("/event/<event_id>/tag/<tag_name>", methods=["POST"])
def r_tag_add(event_id, tag_name):
    event = Event.by_id(event_id)

    event.add_tag(tag_name)
    Session().commit()

    return jsonify(ok)


@bp.route("/event/<event_id>/tag/<tag_name>", methods=["DELETE"])
def r_tag_delete(event_id, tag_name):
    event = Event.by_id(event_id)

    event.delete_tag(tag_name)
    Session().commit()

    return jsonify(ok)


def list_public_events(date=None, from_date=None, to_date=None, tag=None):
    query = Event.query().filter_by(
        event_type='public'
    ).filter(
        Event.posted_vk != None
    ).filter(
        Event.posted_vk != ''
    ).filter(
        Event.start_ts >= datetime(2018, 6, 1).timestamp() # earlier events are not cleaned up yet
    )

    if tag:
        query = query.join(EventTag).filter(EventTag.name == tag)

    if not from_date and not to_date and not date:
        raise PublicError("One of 'date', 'from_date', 'to_date' must be set")

    if from_date:
        query = query.filter(Event.start_ts >= datetime.combine(from_date, time.min).timestamp())

    if to_date:
        query = query.filter(Event.start_ts <= datetime.combine(to_date, time.max).timestamp())

    if date:
        query = query.filter(
            Event.start_ts >= datetime.combine(date, time.min).timestamp()
        ).filter(
            Event.start_ts <= datetime.combine(date, time.max).timestamp()
        )

    print(str(query))

    events = query.order_by(Event.start_ts).limit(1000).all()

    return [
        e.public_object()
        for e in events
    ]


@bp.route("/public_events")
def r_list_public():
    def arg2date(arg):
        d = request.args.get(arg)
        if d:
            d = datetime.strptime(d, "%Y-%m-%d").date()
        return d

    data = list_public_events(
        date=arg2date('date'),
        from_date=arg2date('from_date'),
        to_date=arg2date('to_date'),
        tag=request.args.get('tag'),
    )
    return jsonify(data)

@bp.route("/public_events/today")
def r_list_public_today():
    return jsonify(
        list_public_events(
            date=datetime.today().date(),
            tag=request.args.get('tag'),
        )
    )

@bp.route("/public_events_atom")
def r_list_public_atom():
    data = list_public_events(
        from_date=datetime.now().date(),
        tag=request.args.get('tag'),
    )

    fg = FeedGenerator()
    fg.id(f'{config()["web_root"]}/public_events_atom') # should we add query params here?
    fg.title('Публичные мероприятия Кочерги')
    fg.author({ 'name': 'Антикафе Кочерга' })

    for item in reversed(data):
        fe = fg.add_entry()
        fe.id(f'{config()["web_root"]}/public_event/{item["event_id"]}')
        dt = datetime.strptime(item["start"], MSK_DATE_FORMAT)
        fe.title(item["title"])
        dt_str = kocherga.datetime.weekday(dt).capitalize() + ', ' + str(dt.day) + ' ' + kocherga.datetime.inflected_month(dt) + ', ' + dt.strftime('%H:%M')
        fe.summary(dt_str)
        fe.content(dt_str)
        fe.link(href=item["announcements"]["vk"]["link"])

    return fg.atom_str(pretty=True)
