import sys
from flask import Blueprint, jsonify, request, send_file

from kocherga.error import PublicError
import kocherga.events
from kocherga.images import image_storage
from kocherga.api.common import ok
from kocherga.api.auth import token_auth

bp = Blueprint('events', __name__)

@bp.route('/events')
@token_auth
def events():
    events = kocherga.events.all_future_events()
    return jsonify(events)


@bp.route('/event/<event_id>')
@token_auth
def event(event_id):
    event = kocherga.events.get_event(event_id)
    return jsonify(event)


@bp.route('/event/<event_id>/property/<key>', methods=['POST'])
@token_auth
def set_property(event_id, key):
    value = request.get_json()['value']
    kocherga.events.set_property(event_id, key, value)
    return jsonify(ok)

@bp.route('/event/<event_id>/post/timepad', methods=['POST'])
@token_auth
def post_timepad(event_id):
    kocherga.events.post_to_timepad(event_id)
    return jsonify(ok)

@bp.route('/event/<event_id>/check/timepad', methods=['POST'])
@token_auth
def check_timepad(event_id):
    outcome = kocherga.events.check_timepad(event_id)
    return 'ok: {}'.format(outcome), 200

@bp.route('/event/<event_id>/image/<image_type>', methods=['POST'])
@token_auth
def upload_event_image(event_id, image_type):
    print('uploading')
    if image_type not in kocherga.events.IMAGE_TYPES:
        raise PublicError('unknown image type {}'.format(image_type))

    if not kocherga.events.get_event(event_id):
        raise PublicError('event {} not found'.format(event_id)) # actually, get_event() will raise an error, so we'll never get to this point anyway

    if 'file' not in request.files:
        raise PublicError('Expected a file')
    file = request.files['file']

    if file.filename == '':
        raise PublicError('No filename')

    filename = image_storage.event_image_file(event_id, image_type)
    print('filename: ' + filename)
    file.save(filename)

    kocherga.events.set_property(
        event_id,
        kocherga.events.image_flag_property(image_type),
        'true'
    )

    return jsonify(ok)

@bp.route('/event/<event_id>/image/<image_type>', methods=['GET'])
def event_image(event_id, image_type):
    if image_type not in kocherga.events.IMAGE_TYPES:
        raise PublicError('unknown image type {}'.format(image_type))

    return send_file(image_storage.event_image_file(event_id, image_type))

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
