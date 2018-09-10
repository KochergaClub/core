import logging
logger = logging.getLogger(__name__)

import sys
from datetime import datetime, timedelta

from quart import Blueprint, jsonify, request, send_file

from kocherga.error import PublicError
from kocherga.db import Session

from kocherga.images import image_storage
from kocherga.events.event import Event
import kocherga.events.timepad
import kocherga.events.vk
import kocherga.events.telegram
import kocherga.events.announce
import kocherga.email.weekly_digest

from kocherga.api.auth import auth
from kocherga.api.common import ok

bp = Blueprint("announces", __name__)

# Idea: workflows for announcements.
# /workflow/timepad -> returns { 'steps': ['post-draft', 'publish'], 'current-step': ... }
# /workflow/timepad/post-draft
# /workflow/timepad/publish


@bp.route("/announcements/timepad/event/<event_id>", methods=["POST"])
@auth("kocherga")
def r_timepad_post(event_id):
    event = Event.by_id(event_id)
    announcement = kocherga.events.announce.post_to_timepad(event)
    Session().commit()
    return jsonify({"link": announcement.link})


@bp.route("/announcements/timepad/categories")
@auth("kocherga")
def r_timepad_categories():
    categories = kocherga.events.timepad.timepad_categories()
    return jsonify([{"id": c.id, "name": c.name, "code": c.code} for c in categories])


@bp.route("/announcements/vk/groups")
@auth("kocherga")
def vk_groups():
    all_groups = kocherga.events.vk.all_groups()
    return jsonify(all_groups)


@bp.route("/announcements/vk/update_wiki_schedule", methods=["POST"])
@auth("kocherga")
def r_vk_update_wiki_schedule():
    kocherga.events.vk.update_wiki_schedule()
    return jsonify(ok)


@bp.route("/announcements/vk/create_schedule_post", methods=["POST"])
@auth("kocherga")
def r_vk_create_schedule_post():
    kocherga.events.vk.create_schedule_post('')
    return jsonify(ok)


@bp.route("/announcements/telegram/post_schedule", methods=["POST"])
@auth("kocherga")
def r_telegram_post_schedule():
    kocherga.events.telegram.post_schedule()
    return jsonify(ok)


@bp.route("/announcements/email/post_digest", methods=["POST"])
@auth("kocherga")
def r_email_post_digest():
    text = (await request.get_json()).get('text', '')
    kocherga.email.weekly_digest.create_draft(text)
    return jsonify(ok)


@bp.route("/announcements/vk/event/<event_id>", methods=["POST"])
@auth("kocherga")
def r_vk_post(event_id):
    event = Event.by_id(event_id)
    announcement = kocherga.events.announce.post_to_vk(event)
    Session().commit()
    return jsonify({"link": announcement.link})


@bp.route("/announcements/fb/groups")
@auth("kocherga")
def r_fb_groups():
    all_groups = kocherga.events.fb.all_groups()
    return jsonify(all_groups)


@bp.route("/announcements/fb/event/<event_id>", methods=["POST"])
@auth("kocherga")
async def r_fb_post(event_id):
    access_token = (await request.get_json())["fb_access_token"]

    event = Event.by_id(event_id)
    announcement = await kocherga.events.announce.post_to_fb(event, access_token)
    Session().commit()
    return jsonify({"link": announcement.link})


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


@bp.route("/screenshot/error", methods=["GET"])
def r_last_screenshot():
    filename = image_storage.screenshot_file("error")
    return send_file(filename)
