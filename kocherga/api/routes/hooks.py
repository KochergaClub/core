import logging
logger = logging.getLogger(__name__)

import json

from quart import Blueprint, request

import kocherga.config
import kocherga.slack

# Routes for external hooks.

bp = Blueprint("hooks", __name__)

VK_SECRET = kocherga.config.config()['vk']['callback_secret']

@bp.route("/hooks/vk_callback", methods=["POST"])
async def r_vk_callback():
    payload = await request.get_json()

    req_secret = payload["secret"]
    assert req_secret == VK_SECRET

    # sorry for hardcode, I'll fix this later with https://vk.com/dev/groups.addCallbackServer
    if payload["type"] == "confirmation" and payload["group_id"] == 99973027:
        return "f4cc4bd9"

    if payload["type"] == "message_new":
        result = kocherga.slack.client().api_call(
            "chat.postMessage",
            text='Новое сообщение вк-сообществу',
            channel='#test',
        )
        if not result['ok']:
            raise Exception("processing failed")

    return "ok"
