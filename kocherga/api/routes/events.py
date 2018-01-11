import sys
from flask import Blueprint, jsonify, request, send_file
from datetime import datetime, timedelta
import requests

from kocherga.error import PublicError
import kocherga.events.db
import kocherga.events.event
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

    print(
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
    event = kocherga.events.db.get_event(event_id)
    return jsonify(event.to_dict())


@bp.route('/event/<event_id>/property/<key>', methods=['POST'])
@auth('kocherga')
def set_property(event_id, key):
    value = request.get_json()['value']
    kocherga.events.db.set_event_property(event_id, key, value)
    return jsonify(ok)

@bp.route('/event/<event_id>', methods=['PATCH'])
@auth('kocherga')
def patch_event(event_id):
    payload = request.get_json() or request.form

    return jsonify(
        kocherga.events.db.patch_event(event_id, payload).to_dict()
    )

# Idea: workflows for announcements.
# /workflow/timepad -> returns { 'steps': ['post-draft', 'publish'], 'current-step': ... }
# /workflow/timepad/post-draft
# /workflow/timepad/publish

@bp.route('/event/<event_id>/announce/timepad', methods=['POST'])
@auth('kocherga')
def post_timepad(event_id):
    event = kocherga.events.db.get_event(event_id)
    announcement = kocherga.events.announce.post_to_timepad(event)
    return jsonify({ 'link': announcement.link })

@bp.route('/event/<event_id>/announce/vk', methods=['POST'])
@auth('kocherga')
def post_vk(event_id):
    event = kocherga.events.db.get_event(event_id)
    announcement = kocherga.events.announce.post_to_vk(event)
    return jsonify({ 'link': announcement.link })

@bp.route('/event/<event_id>/image/<image_type>', methods=['POST'])
@auth('kocherga')
def upload_event_image(event_id, image_type):
    print('uploading')
    if 'file' not in request.files:
        raise PublicError('Expected a file')
    file = request.files['file']

    if file.filename == '':
        raise PublicError('No filename')

    kocherga.events.db.add_image(event_id, image_type, file.stream)

    return jsonify(ok)

@bp.route('/event/<event_id>/image_from_url/<image_type>', methods=['POST'])
@auth('kocherga')
def set_event_image_from_url(event_id, image_type):
    payload = request.get_json() or request.form

    url = payload['url']
    r = requests.get(url, stream=True)

    filename = image_storage.event_image_file(event_id, image_type)
    with open(filename, 'wb') as fh:
        for chunk in r.iter_content(100000):
            fh.write(chunk)

    kocherga.events.db.set_event_property(
        event_id,
        kocherga.events.event.image_flag_property(image_type),
        'true'
    )

    return jsonify(ok)

@bp.route('/event/<event_id>/image/<image_type>', methods=['GET'])
def event_image(event_id, image_type):
    if image_type not in kocherga.events.event.IMAGE_TYPES:
        raise PublicError('unknown image type {}'.format(image_type))

    return send_file(image_storage.event_image_file(event_id, image_type))

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
