import logging
logger = logging.getLogger(__name__)

import sys
from quart import Blueprint, jsonify, request, send_file
from datetime import datetime, timedelta
import requests
from werkzeug.contrib.iterio import IterIO

from kocherga.error import PublicError
from kocherga.db import Session
import kocherga.events.db
from kocherga.events.event import Event
import kocherga.events.announce
from kocherga.images import image_storage
from kocherga.api.common import ok
from kocherga.api.auth import auth

bp = Blueprint('events', __name__)

@bp.route('/events')
@auth('kocherga')
def events():
    def arg2date(arg):
        d = request.args.get(arg)
        if d: d = datetime.strptime(d, '%Y-%m-%d').date()
        return d

    logger.debug(
        dict(
            date=request.args.get('date'),
            from_date=arg2date('from_date'),
            to_date=arg2date('to_date'),
        )
    )
    events = kocherga.events.db.list_events(
        date=request.args.get('date'),
        from_date=arg2date('from_date'),
        to_date=arg2date('to_date'),
    )
    return jsonify([e.to_dict() for e in events])


@bp.route('/event/<event_id>')
@auth('kocherga')
def event(event_id):
    event = Event.by_id(event_id)
    return jsonify(event.to_dict())


@bp.route('/event/<event_id>/property/<key>', methods=['POST'])
@auth('kocherga')
async def set_property(event_id, key):
    value = (await request.get_json())['value']
    event = Event.by_id(event_id)
    event.set_prop(key, value)
    Session().commit()
    return jsonify(ok)

@bp.route('/event/<event_id>', methods=['PATCH'])
@auth('kocherga')
async def patch_event(event_id):
    payload = await request.get_json() or await request.form

    result = kocherga.events.db.patch_event(event_id, payload).to_dict()
    Session().commit()
    return jsonify(result)

# DEPRECATED. Use /announcements/... routes instead.
@bp.route('/event/<event_id>/announce/timepad', methods=['POST'])
@auth('kocherga')
def post_timepad(event_id):
    event = Event.by_id(event_id)
    announcement = kocherga.events.announce.post_to_timepad(event)
    Session().commit()
    return jsonify({ 'link': announcement.link })

# DEPRECATED. Use /announcements/... routes instead.
@bp.route('/event/<event_id>/announce/vk', methods=['POST'])
@auth('kocherga')
def post_vk(event_id):
    event = Event.by_id(event_id)
    announcement = kocherga.events.announce.post_to_vk(event)
    Session().commit()
    return jsonify({ 'link': announcement.link })

# DEPRECATED. Use /announcements/... routes instead.
@bp.route('/event/<event_id>/announce/fb', methods=['POST'])
@auth('kocherga')
async def post_fb(event_id):
    access_token = (await request.get_json())['fb_access_token']

    event = Event.by_id(event_id)
    announcement = await kocherga.events.announce.post_to_fb(event, access_token)
    Session().commit()
    return jsonify({ 'link': announcement.link })

@bp.route('/event/<event_id>/image/<image_type>', methods=['POST'])
@auth('kocherga')
async def upload_event_image(event_id, image_type):
    files = await request.files
    if 'file' not in files:
        raise PublicError('Expected a file')
    file = files['file']

    if file.filename == '':
        raise PublicError('No filename')

    event = Event.by_id(event_id)
    event.add_image(image_type, file.stream)
    Session().commit()

    return jsonify(ok)

@bp.route('/event/<event_id>/image_from_url/<image_type>', methods=['POST'])
@auth('kocherga')
async def set_event_image_from_url(event_id, image_type):
    payload = await request.get_json() or await request.form

    url = payload['url']
    r = requests.get(url, stream=True)

    event = Event.by_id(event_id)
    event.add_image(
        image_type,
        IterIO(r.raw.stream(4096, decode_content=True))
    )

    return jsonify(ok)

@bp.route('/event/<event_id>/image/<image_type>', methods=['GET'])
def event_image(event_id, image_type):
    return send_file(Event.by_id(event_id).image_file(image_type))

# No auth - images are requested directly
# TODO - accept a token via CGI params? hmm...
@bp.route('/schedule/weekly-image', methods=['GET'])
def schedule_weekly_image():
    dt = datetime.today()
    if dt.weekday() < 2:
        dt = dt - timedelta(days = dt.weekday())
    else:
        dt = dt + timedelta(days = 7 - dt.weekday())

    try:
        filename = image_storage.schedule_file(dt)
    except:
        error = str(sys.exc_info())
        raise PublicError(error)

    return send_file(filename)

@bp.route('/screenshot/error', methods=['GET'])
def last_screenshot():
    filename = image_storage.screenshot_file('error')
    return send_file(filename)
