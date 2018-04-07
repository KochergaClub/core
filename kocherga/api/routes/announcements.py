import logging
logger = logging.getLogger(__name__)

from quart import Blueprint, jsonify, request

from kocherga.db import Session
from kocherga.events.event import Event
import kocherga.events.timepad
import kocherga.events.announce
from kocherga.api.auth import auth

bp = Blueprint('announces', __name__)

# Idea: workflows for announcements.
# /workflow/timepad -> returns { 'steps': ['post-draft', 'publish'], 'current-step': ... }
# /workflow/timepad/post-draft
# /workflow/timepad/publish

@bp.route('/announcements/timepad/event/<event_id>', methods=['POST'])
@auth('kocherga')
def post_timepad(event_id):
    event = Event.by_id(event_id)
    announcement = kocherga.events.announce.post_to_timepad(event)
    Session().commit()
    return jsonify({ 'link': announcement.link })

@bp.route('/announcements/timepad/categories')
@auth('kocherga')
def timepad_categories():
    categories = kocherga.events.timepad.timepad_categories()
    return jsonify([
        {
            'id': c.id,
            'name': c.name,
            'code': c.code,
        }
        for c in categories
    ])

@bp.route('/announcements/vk/event/<event_id>', methods=['POST'])
@auth('kocherga')
def post_vk(event_id):
    event = Event.by_id(event_id)
    announcement = kocherga.events.announce.post_to_vk(event)
    Session().commit()
    return jsonify({ 'link': announcement.link })

@bp.route('/announcements/fb/event/<event_id>', methods=['POST'])
@auth('kocherga')
async def post_fb(event_id):
    access_token = (await request.get_json())['fb_access_token']

    event = Event.by_id(event_id)
    announcement = await kocherga.events.announce.post_to_fb(event, access_token)
    Session().commit()
    return jsonify({ 'link': announcement.link })
