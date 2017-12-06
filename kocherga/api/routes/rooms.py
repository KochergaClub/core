from flask import Blueprint, jsonify

import kocherga.room

bp = Blueprint('rooms', __name__)

@bp.route('/rooms')
def rooms():
    return jsonify([
        kocherga.room.details(room)
        for room in kocherga.room.all_rooms
    ])
