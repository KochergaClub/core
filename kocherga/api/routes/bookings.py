from flask import Blueprint, jsonify, request

from datetime import datetime

from kocherga.error import PublicError
import kocherga.events.booking
from kocherga.api.auth import auth, get_email
from kocherga.api.common import ok

bp = Blueprint('bookings', __name__)

@bp.route('/my/bookings')
@auth('any')
def my_bookings():
    bookings = kocherga.events.booking.bookings_by_email(get_email())
    return jsonify([
        b.public_object()
        for b in bookings
    ])

@bp.route('/bookings/<date_str>')
def bookings(date_str):
    if date_str == 'today':
        date = datetime.today().date()
    else:
        date = datetime.strptime(date_str, '%Y-%m-%d').date()

    bookings = kocherga.events.booking.day_bookings(date)
    return jsonify([
        b.public_object()
        for b in bookings
    ])

@bp.route('/bookings', methods=['POST'])
@auth('any')
def add_booking():
    data = {
        'contact': get_email()
    }
    payload = request.get_json() or request.form
    for field in ('date', 'room', 'people', 'startTime', 'endTime'):
        if field not in payload:
            raise PublicError('field {} is required'.format(field))
        data[field] = str(payload.get(field, ''))
    kocherga.events.booking.add_booking(**data)

    return jsonify(ok)

@bp.route('/bookings/<event_id>', methods=['DELETE'])
@auth('any')
def delete_booking(event_id):
    email = get_email()
    payload = request.get_json() or request.form

    kocherga.events.booking.delete_booking(event_id, email)

    return jsonify(ok)
