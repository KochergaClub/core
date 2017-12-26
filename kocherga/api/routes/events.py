import sys
from flask import Blueprint, jsonify, request, send_file
from datetime import datetime, timedelta

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
        d = request.args.get('from_date')
        if d: d = datetime.strptime(d, '%Y-%m-%d').date()
        return d

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

# Idea: workflows for announcements.
# /workflow/timepad -> returns { 'steps': ['post-draft', 'publish'], 'current-step': ... }
# /workflow/timepad/post-draft
# /workflow/timepad/publish

@bp.route('/event/<event_id>/announce/timepad', methods=['POST'])
@auth('kocherga')
def post_timepad(event_id):
    event = kocherga.events.db.get_event(event_id)
    timepad_event_id = kocherga.events.announce.post_to_timepad(event)
    return jsonify({ 'timepad_event_id': timepad_event_id })

#@bp.route('/event/<event_id>/check/timepad', methods=['POST'])
#@auth('kocherga')
#def check_timepad(event_id):
#    outcome = kocherga.events.check_timepad(event_id)
#    return 'ok: {}'.format(outcome), 200

@bp.route('/event/<event_id>/image/<image_type>', methods=['POST'])
@auth('kocherga')
def upload_event_image(event_id, image_type):
    print('uploading')
    if image_type not in kocherga.events.event.IMAGE_TYPES:
        raise PublicError('unknown image type {}'.format(image_type))

    if not kocherga.events.db.get_event(event_id):
        raise PublicError('event {} not found'.format(event_id)) # actually, get_event() will raise an error, so we'll never get to this point anyway

    if 'file' not in request.files:
        raise PublicError('Expected a file')
    file = request.files['file']

    if file.filename == '':
        raise PublicError('No filename')

    filename = image_storage.event_image_file(event_id, image_type)
    print('filename: ' + filename)
    file.save(filename)

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
